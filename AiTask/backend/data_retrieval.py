import requests

def fetch_data(api_url):
    response = requests.get(api_url)
    response.raise_for_status()
    data = response.json()
    return data

def extract_text(post):
    # Extract relevant text content from the WordPress post JSON
    return post.get('content', '')

# Example usage
# api_url = 'https://example.com/wp-json/wp/v2/posts'
# posts = fetch_data(api_url)
# for post in posts:
#     text = extract_text(post)
#     print(text)
