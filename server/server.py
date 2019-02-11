import nltk
from nltk.corpus import stopwords
from difflib import SequenceMatcher
from fuzzywuzzy import fuzz
#from pymongo import MongoClient
import mysql.connector
from mysql.connector import Error

import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('punkt')
nltk.download('stopwords')

class qna:

    def getAnswer(self, question):
        # process question asked
        print "Question: ",question
        question_tokens= self.tokenize(question)
        print "Question tokens: ", question_tokens
        question_keywords = self.stopwordsRemoval(question_tokens)
        print "Question keywords: ", question_keywords
        # get data from the DB
        resultset=self.getDocuments()
        response = ''
        source='chatbot'
        #process question from MySQL
        for row in resultset:
            # print "mongo: ", document
            q = row[1]
            q_tokens = self.tokenize(q)
            q_keywords = self.stopwordsRemoval(q_tokens)
            valueFuzz, valueFuzzSort = self.similairtyRatio(q_keywords, question_keywords)
            if valueFuzz >= 80 or valueFuzzSort>=80:
                self.insertHistory(question, row[0], source);
                response = row[2]
        if response=='':
            return "I dont understand your question"
        return response

        # process question from MongoDB
        # for document in resultset:
        #     # print "mongo: ", document
        #     q = document['question']
        #     q_tokens = self.tokenize(q)
        #     q_keywords = self.stopwordsRemoval(q_tokens)
        #     valueFuzz, valueFuzzSort = self.similairtyRatio(q_keywords, question_keywords)
        #     if valueFuzz >= 80 or valueFuzzSort>=80:
        #         response = document['answer']



    def getDocuments(self):
        # client = MongoClient('mongodb://localhost:27017/')
        # db = client.cmpe_qna
        # collection = db.response
        # resultset = collection.find({})
        # return resultset
        try:
            connection = mysql.connector.connect(host='localhost',database='cmpe295',user='root', password='12345')
            sql_select_Query = "select * from qna"
            cursor = connection .cursor()
            cursor.execute(sql_select_Query)
            records = cursor.fetchall()
            return records
        except Error as e :
            print ("Error while connecting to MySQL", e)
        finally:
            if(connection .is_connected()):
                connection.close()
                print("MySQL connection is closed")

    def insertHistory(slef, question, qnaid, source):
        try:
            connection = mysql.connector.connect(host='localhost',database='cmpe295',user='root', password='12345')
            insert_query = "INSERT INTO history(question,qnaid,source) VALUES(?,?,?)"
            val = (question, qnaid, source)
            cursor = connection.cursor()
            result  = cursor.execute(insert_query, val)
            connection.commit()
            print ("Record inserted successfully into python_users table")
        except mysql.connector.Error as error :
            connection.rollback() #rollback if any exception occured
            print("Failed inserting record into python_users table {}".format(error))
        finally:
            #closing database connection.
            if(connection.is_connected()):
                cursor.close()
                connection.close()
                print("MySQL connection is closed")

    def tokenize(self, question):
        return nltk.word_tokenize(question)

    def stopwordsRemoval(self, question_tokens):
        en_stops = set(stopwords.words('english'))
        q1=""
        for word in question_tokens:
            if word not in en_stops:
                q1 = q1 + word + " "
        return q1

    def similairtyRatio(self, keywordsDB, keywordsQuestion):
        print "Sequence Matcher: ", SequenceMatcher(None, keywordsDB, keywordsQuestion).ratio()
        print "Fuzz ratio: ", fuzz.ratio(keywordsDB, keywordsQuestion)
        print "Fuzz token sort ratio: ", fuzz.token_sort_ratio(keywordsDB, keywordsQuestion)
        return fuzz.ratio(keywordsDB, keywordsQuestion), fuzz.token_sort_ratio(keywordsDB, keywordsQuestion)

obj= qna()
print obj.getAnswer("When is Professor Dan Harkey's office hours")
