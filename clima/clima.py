import requests

def get_coordinates(city):
    """Obtém latitude e longitude a partir do nome da cidade usando a API Nominatim."""
    url = f'https://nominatim.openstreetmap.org/search'
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

def get_weather(lat, lon):
    """Obtém dados de clima da API Open-Meteo."""
    url = 'https://api.open-meteo.com/v1/forecast'
    params = {
        'latitude': lat,
        'longitude': lon,
        'current_weather': True
    }
    response = requests.get(url, params=params)
    return response.json()

def main():
    city = input('Digite o nome da cidade: ')
    lat, lon = get_coordinates(city)
    if lat is None or lon is None:
        print('Cidade não encontrada.')
        return
    weather = get_weather(lat, lon)
    if 'current_weather' in weather:
        temp = weather['current_weather']['temperature']
        wind = weather['current_weather']['windspeed']
        print(f'Clima atual em {city}:')
        print(f'Temperatura: {temp}°C')
        print(f'Velocidade do vento: {wind} km/h')
    else:
        print('Não foi possível obter os dados do clima.')

if __name__ == '__main__':
    main()
