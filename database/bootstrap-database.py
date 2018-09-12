#!\usr\bin\python
import mysql.connector as mariadb
import csv

DB_USER = 'cfuser'
DB_PASS = 'cfs3cr3t'
DB_NAME = 'cidadaofiscal'
DB_HOST = '127.0.0.1'
DB_PORT = '38306'

COMMIT_STEP = 100

print('Connecting to {0}@{1}:{2}/{3}...'.format(DB_USER, DB_HOST, DB_PORT, DB_NAME))

mariadb_connection = mariadb.connect(user=DB_USER, password=DB_PASS, database=DB_NAME, host=DB_HOST, port=DB_PORT)
cursor = mariadb_connection.cursor()

print('Cleaning previous data...')
cursor.execute("""DROP TABLE IF EXISTS cf_alepe""")
print('Creating schema...')
cursor.execute("""CREATE TABLE IF NOT EXISTS cf_alepe (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                parlamentar_fantasia VARCHAR(255),
                parlamentar_partido VARCHAR(24),
                parlamentar_nome VARCHAR(255),
                parlamentar_dtnasc DATE,
                ordem_tipo VARCHAR(48),
                ordem_id VARCHAR(255),
                ordem_valor VARCHAR(255),
                ordem_ano INT(4) UNSIGNED,
                ordem_mes INT(2) UNSIGNED,
                despesa_tipo VARCHAR(255),
                despesa_data DATE,
                despesa_valor DECIMAL(13,4),
                despesa_cancelada TINYINT(1),
                fornecedor_id VARCHAR(255),
                fornecedor_nome VARCHAR(255)
                )""")

cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_parlamentar_fantasia ON cf_alepe (parlamentar_fantasia)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_parlamentar_partido ON cf_alepe (parlamentar_partido)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_ordem_tipo ON cf_alepe (ordem_tipo)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_ordem_id ON cf_alepe (ordem_id)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_ordem_ano ON cf_alepe (ordem_ano)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_ordem_mes ON cf_alepe (ordem_mes)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_despesa_tipo ON cf_alepe (despesa_tipo)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_despesa_canceleada ON cf_alepe (despesa_cancelada)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_fornecedor_id ON cf_alepe (fornecedor_id)")
cursor.execute("CREATE INDEX IF NOT EXISTS cf_alepe_idx_fornecedor_nome ON cf_alepe (fornecedor_nome)")

print('Loading data...')

with open('basecompleta-clear.csv', 'rt') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')

    rowCount = len(list(spamreader))
    csvfile.seek(0)
    currentRow = 0
    isDataRow = False
    for row in spamreader:
        currentRow = currentRow + 1
        if isDataRow:
            if ((currentRow % COMMIT_STEP == 0) or (currentRow == rowCount)):
                print ('{0:.2f}% : {1}/{2}'.format((100*currentRow/rowCount), currentRow, rowCount), end='\r')
                mariadb_connection.commit()

            cursor.execute("""INSERT INTO cf_alepe (
                parlamentar_fantasia, 
                parlamentar_partido, 
                parlamentar_nome, 
                parlamentar_dtnasc, 
                ordem_tipo, 
                ordem_id, 
                ordem_valor, 
                ordem_ano, 
                ordem_mes, 
                despesa_tipo, 
                despesa_data, 
                despesa_valor, 
                despesa_cancelada, 
                fornecedor_id, 
                fornecedor_nome)
                VALUES (
                    %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
                )""", tuple(row))
        isDataRow = True
    print ('\nDone updating database.')
cursor.close()
mariadb_connection.commit()
mariadb_connection.close()
print ('Database connection closed.')
