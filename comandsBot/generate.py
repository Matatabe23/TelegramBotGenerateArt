import requests
import json
import base64

url = 'https://holara.ai/holara/api/external/1.0/generate_image'
def process_data(data):
	obj = json.loads(data)
	print(obj)
	
	response = requests.post(url, json=obj)
	if response.status_code == 200:
		result = response.json()
		print(result)
		return result
	else:
		print('Ошибка')
		return None

# response = requests.request('POST', url, data=data)
# if response.status_code != 200:
# 	print(f'Error: {response.status_code} {response.content}')
# else:
# 	response = json.loads(response.content)
# 	image_base64 = response['images'][0]
# 	image = base64.b64decode(image_base64)
# 	with open('image.png', 'wb') as f:
# 		f.write(image)