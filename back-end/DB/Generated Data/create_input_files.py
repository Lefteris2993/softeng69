import json
import csv
import pandas as pd
from random import choices, uniform


stations = []
for i in range(1,133):
	stations.append("Station%d" % i)

providers = []
for i in range(1,51):
	providers.append("Provider%d" % i)

protocol = []
for i in range(1,5):
	protocol.append("Protocol%d" % i)

CostPerKWh = []
for i in range(50):
	CostPerKWh.append(round(uniform(0.18,0.27), 2))

with open('generated_data/providers.csv', 'w') as providers_file:
	providers_csv = csv.writer(providers_file, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	providers_csv.writerow(['Name', 'CostPerKWh'])
	for i in range(50):
		providers_csv.writerow([providers[i], CostPerKWh[i]])

PricePolicyRef = ["Standard", "10% off", "Coupon used", "Happy Hour! 20% off", "Black Friday", "Xtypisame dialysi, ola 80% katw"]
population = [0, 1, 2, 3, 4, 5]
weights = [0.5, 0.15, 0.2, 0.05, 0.05, 0.05]

Payment = ["Cash", "Card", "Periodic Receipt"]
population2 = [0, 1, 2]
weights2 = [0.4, 0.4, 0.2]

test = {}
point_id = []
operator_id_per_point = []
station_operator_pairs = {}
cnt = 0
with open('./charging_points_europe_json/poi.json') as json_file:
	for i in range(15000):
		json_str = json_file.readline()
		data = json.loads(json_str)
		while data['OperatorID'] == None:
			json_str = json_file.readline()
			data = json.loads(json_str)
		point_id.append(data['_id']['$oid'])
		operator_id_per_point.append(data['OperatorID'])
		if data['OperatorID'] in test:
			continue
		else:
			test[data['OperatorID']] = data['OperatorID']
			station_operator_pairs[stations[cnt]] = data['OperatorID']
			cnt = cnt + 1

with open('generated_data/stations.csv', 'w') as stations_file:
	stations_csv = csv.writer(stations_file, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	stations_csv.writerow(['ID', 'Operator'])
	for station in stations:
		stations_csv.writerow([station, station_operator_pairs[station]])

with open('generated_data/points.csv', 'w') as points_file:
	points_csv = csv.writer(points_file, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	points_csv.writerow(['ID', 'Station'])
	for i in range(15000):
		points_csv.writerow([point_id[i], stations[i % 132]])

vehicle_tuples = []
with open('electric_vehicles_data.json') as json_file:
	data = json.load(json_file)
	for vehicle in data['data']:
		vehicle_tuples.append((vehicle['id'], vehicle['brand'], vehicle['type']))

with open('generated_data/vehicles.csv', 'w') as vehicles_file:
	vehicles_csv = csv.writer(vehicles_file, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	vehicles_csv.writerow(['ID', 'Brand', 'Type'])
	for vehicle in vehicle_tuples:
		vehicles_csv.writerow([vehicle[0], vehicle[1], vehicle[2]])

def convert_to_timestamp(datetime):
	months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}
	string = datetime[5:]
	result = string[7:11] + "-" + months[string[3:6]] + "-" + string[0:2] + string[11:20]
	return result

session_file_tuples = []
with open('./acn_data/caltech_acndata_sessions_12month.json') as json_file:
	data = json.load(json_file)
	for session in data['_items']:
		connectionTime = convert_to_timestamp(session["connectionTime"])
		disconnectTime = convert_to_timestamp(session["disconnectTime"])
		kWh = session["kWhDelivered"]
		sessionID = session["sessionID"]
		session_file_tuples.append((sessionID, connectionTime, disconnectTime, kWh))

with open('./acn_data/caltech_acndata_sessions_33month.json') as json_file:
	data = json.load(json_file)
	for session in data['_items']:
		connectionTime = convert_to_timestamp(session["connectionTime"])
		disconnectTime = convert_to_timestamp(session["disconnectTime"])
		kWh = session["kWhDelivered"]
		sessionID = session["sessionID"]
		session_file_tuples.append((sessionID, connectionTime, disconnectTime, kWh))


with open('./acn_data/jpl_acndata_sessions_46month.json') as json_file:
	data = json.load(json_file)
	for session in data['_items']:
		connectionTime = convert_to_timestamp(session["connectionTime"])
		disconnectTime = convert_to_timestamp(session["disconnectTime"])
		kWh = session["kWhDelivered"]
		sessionID = session["sessionID"]
		session_file_tuples.append((sessionID, connectionTime, disconnectTime, kWh))

with open('generated_data/sessions.csv', 'w') as sessions_file:
	sessions_csv = csv.writer(sessions_file, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)
	sessions_csv.writerow(['ID', 'ConnectionTime', 'DisconnectTime', 'kWhDelivered', 'Payment',	'VehicleID', 'PointID',	'PricePolicyRef'])
	for i in range(60734):
		sessions_csv.writerow([session_file_tuples[i][0], session_file_tuples[i][1], session_file_tuples[i][2], session_file_tuples[i][3], Payment[choices(population2, weights2)[0]], vehicle_tuples[i%143][0], point_id[i%15000], PricePolicyRef[choices(population, weights)[0]]])

f = pd.read_csv("charging_points_europe_csv/Operators_data.csv", sep=';', error_bad_lines=False)
keep_col = ['ID', 'Title']
new_f = f[keep_col]
new_f.to_csv('generated_data/operators.csv', index=False)
with open('generated_data/operators.csv', 'a') as file:
	file.write("76;ELMO\n")