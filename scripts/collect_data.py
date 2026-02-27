import pandas as pd
import requests
import os
import json

def download_and_process():
    url = "https://huggingface.co/datasets/JonaszPotoniec/dowcipy-polish-jokes-dataset/resolve/main/data/train-00000-of-00001.parquet"
    parquet_path = "jokes.parquet"
    json_path = "public/data/jokes.json"
    
    print(f"Downloading {url}...")
    response = requests.get(url)
    with open(parquet_path, "wb") as f:
        f.write(response.content)
    
    print("Processing parquet file...")
    df = pd.read_parquet(parquet_path)
    
    # Let's see the columns first to make sure we extract the right one
    print(f"Columns: {df.columns.tolist()}")
    
    # The column name is 'joke' as verified
    jokes = df['joke'].tolist()
    
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(jokes, f, ensure_ascii=False, indent=2)
    
    print(f"Saved {len(jokes)} jokes to {json_path}")
    os.remove(parquet_path)

if __name__ == "__main__":
    download_and_process()
