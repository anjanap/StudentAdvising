import nltk
from nltk.corpus import stopwords
from difflib import SequenceMatcher
from fuzzywuzzy import fuzz
from pymongo import MongoClient

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

        # process question from the DB
        for document in resultset:
            # print "mongo: ", document
            q = document['question']
            q_tokens = self.tokenize(q)
            q_keywords = self.stopwordsRemoval(q_tokens)
            valueFuzz, valueFuzzSort = self.similairtyRatio(q_keywords, question_keywords)
            if valueFuzz >= 80 or valueFuzzSort>=80:
                response = document['answer']


        # db=[{'question': "Professor Dan Harkey's office hours", 'answer': 'Tuesday and Thurday from 4pm to 5pm'},
        #     {'question': "Can i start masters project with GPA less than 3", 'answer': 'No. The minmum requirement for the GPA to start project is 3.0'},
        #     {'question': 'When can I start masters projects', 'answer': 'You need to complete core and specilization courses and CMPE294'}]
        # response=''
        # for d in db:
        #     q=d['question']
        #     q_tokens = self.tokenize(q)
        #     q_keywords = self.stopwordsRemoval(q_tokens)
        #     value = self.similairtyRatio(q_keywords, question_keywords)
        #     if value >=80:
        #         response=d['answer']

        if response=='':
            response= "I dont understand your question"
        print "\nResponse: ", response

    def getDocuments(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client.cmpe_qna
        collection = db.response
        resultset = collection.find({})
        return resultset

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
obj.getAnswer("When is Professor Dan Harkey's office hours")
