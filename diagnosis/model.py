import os
import sys
import constants
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = constants.KEY # Input your own OpenAI Key for personal use

query = sys.argv[1] 

loader = TextLoader("data.txt")
index = VectorstoreIndexCreator().from_loaders([loader])
print(index.query(query, llm=ChatOpenAI()))