import os
import time
import re
from slackclient import SlackClient
import mysql.connector
import json
import yaml
import ast
import requests
                            
token = ''
print(token)
slack_client = SlackClient(token)
starterbot_id = None
url = ""
headers = {"Content-Type":"application/json","Authorization":"Basic YXBpa2V5OlhWa3NqQTJtdFlpRm1BTXYtRUFhejVCNEhwcDVhekk0Y01aY2N2VFlfZjVw","Accept": "application/json"}

# constants
RTM_READ_DELAY = 1 # 1 second delay between reading from RTM
#MENTION_REGEX = "^<@(|[WU].+?)>(.*)"

def getAnswer(user_question):

    conn = mysql.connector.connect(user='sjsu', password='11223344',
                              host='',port='3306',
                              database='SJSU_Advising')
    cursor = conn.cursor()
    query = "call advising.prc_get_answer(\"%s\");" % user_question
    cursor.execute(query)
    records = cursor.fetchone()

    cursor.close()
    conn.close()
    result = records[0]
    print(result)
    if result == "Question doesn't exist":
        return 'I am unable to answer your question at this time. I\'ll forward your question to the advisor.'
    else:
        d = ast.literal_eval(result)
        return((d[0]['answer']))

def parse_bot_commands(slack_events):
    """
        Parses a list of events coming from the Slack RTM API to find bot commands.
        If a bot command is found, this function returns a tuple of command and channel.
        If its not found, then this function returns None, None.
    """
    for event in slack_events:
        if event["type"] == "message" and not "subtype" in event:
            #print(event)
            #user_id, message = parse_direct_mention(event["text"])
            message = event["text"]
            return message, event["channel"]
    return None, None

def handle_command(command, channel):
    """
        Executes bot command if the command is known
    """
    
    response = 'Oops! I think something broke. I\'ll be right back!'

    json_input = "{\"input\": {\"text\": \"%s\"}}" % command
    response = requests.post(url,headers=headers,data=json_input)

    if(response.status_code == 200):
        text = response.json()
        intent = text["intents"]
        resp = text["output"]["text"][0]
        print(resp)
        
        for i in intent:
            highest_intent = i["intent"]
            break

        print(highest_intent)

        if highest_intent == 'ask_question':
            response = getAnswer(command)

        else:
            response = resp
        
        # elif highest_intent == 'General_About_You':
        #     response = 'Hi there! I am SJSU\'s official Advising bot. I am here to help you by answering your questions related to courses, faculty, internships and much more. So, how can I help you today?'

        # elif highest_intent == 'General_Agent_Capabilities':
        #     response = 'I am your virtual advisor. I am powered by Watson. I can answer questions for you related to courses, faculty, internships and much more.'        
        
        # elif highest_intent == 'General_Connect_to_Agent':
        #     response = 'Your question is too complex for my understanding. I have forwarded your question to the advisor. Thank you!'
        
        # elif highest_intent == 'General_Greetings':
        #     response = 'Hey there! I am SJSU\'s official Advising bot. I am here to help you by answering your questions related to courses, faculty, internships and much more. So, how can I help you today?'

        # elif highest_intent == 'General_Negative_Feedback':
        #     response = 'Alas! I am sorry to hear that you did not like the chatbot. I am trying to improve every single day. I\'ll inform my developers of this.'

        # elif highest_intent == 'General_Positive_Feedback':
        #     response = 'Well, thank you so much! This will make my developers really happy.'               
        
        # elif highest_intent == 'General_Ending':
        #     response = 'Sad to see you go. If you liked my advice, do come back! Bye bye.'

    attachments = json.dumps([
        {
            "color": "#2a4a9c",
            "pretext": "",
            "text": response,
            "image_url":"",
            "thumb_url":"",
            "footer": "San Jose State University",
            "footer_icon":"https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/San_Jose_State_Spartans_logo.svg/1200px-San_Jose_State_Spartans_logo.svg.png"
        }
    ])

    # Sends the response back to the channel
    slack_client.api_call(
        "chat.postMessage",
        channel=channel,
        attachments = attachments
    )

if __name__ == "__main__":

    if slack_client.rtm_connect(with_team_state=False):
        print("Starter Bot connected and running!")
        # Read bot's user ID by calling Web API method `auth.test`
        starterbot_id = slack_client.api_call("auth.test")["user_id"]
        while True:
            command, channel = parse_bot_commands(slack_client.rtm_read())
            if command:
                handle_command(command, channel)
            time.sleep(RTM_READ_DELAY)
    else:
        print("Connection failed. Exception traceback printed above.")
