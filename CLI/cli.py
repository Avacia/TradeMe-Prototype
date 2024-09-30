import argparse
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_uri = os.getenv("MONGODB_URI")
database_name = os.getenv("DATABASE_NAME")
collection_name = os.getenv("COLLECTION_NAME")

def create_item(title, reserve_price, initial_price, type, description):
    
    client = MongoClient(mongodb_uri)
    db = client[database_name]
    items_collection = db[collection_name]
    
    item = {
        "name": title,
        "description": description,
        "initial_price": initial_price,
        "reserve_price": {"none": reserve_price},
        "type": type,
    }
    
    result = items_collection.insert_one(item)
    
    print(f"Item insert with ID: {result.inserted_id}")
    
def main():
    parser = argparse.ArgumentParser(description="Create an auction item and store it to MongoDB")
    
    print("Please provide the following details to create an auction item:")
    print("--title : The title of the item.")
    print("--description : A short description of the item.")
    print("--initial_price : The starting price of the item (numeric value).")
    print("--reserve_price : The reserve price for the item (numeric value).")
    print("--type : The type of the item.")
    
    parser.add_argument("--title", required=True, help="The title of the item.")
    parser.add_argument("--description", required=True, help="A short description of the item.")
    parser.add_argument("--initial_price", required=True, type=float, help="The starting price of the item.")
    parser.add_argument("--reserve_price", required=True, type=float, help="The reserve price for the item.")
    parser.add_argument("--type", required=True, help="The type of the item.")
    
    args = parser.parse_args()
    
    create_item(args.title, args.description, args.initial_price, args.reserve_price, args.type)
    
if __name__ == "__main__":
    main()