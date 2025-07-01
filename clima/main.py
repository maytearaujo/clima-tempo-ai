from api import get_coordinates, get_temperature

def main():
    city = input('Digite o nome da cidade: ')
    lat, lon = get_coordinates(city)
    if lat is None or lon is None:
        print('Cidade não encontrada.')
        return
    temp = get_temperature(lat, lon)
    if temp is not None:
        print(f'Temperatura atual em {city}: {temp}°C')
    else:
        print('Não foi possível obter a temperatura.')

if __name__ == '__main__':
    main()
