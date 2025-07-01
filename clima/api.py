import requests

def get_coordinates(city):
    """Obtém latitude e longitude a partir do nome da cidade usando a API Nominatim."""
    url = 'https://nominatim.openstreetmap.org/search'
    params = {
        'q': city,
        'format': 'json',
        'limit': 1
    }
    headers = {'User-Agent': 'clima-app/1.0'}
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    if data:
        return float(data[0]['lat']), float(data[0]['lon'])
    else:
        return None, None

def get_temperature(lat, lon):
    """Obtém a temperatura atual da API Open-Meteo."""
    url = 'https://api.open-meteo.com/v1/forecast'
    params = {
        'latitude': lat,
        'longitude': lon,
        'current_weather': True
    }
    response = requests.get(url, params=params)
    data = response.json()
    if 'current_weather' in data:
        return data['current_weather']['temperature']
    else:
        return None
