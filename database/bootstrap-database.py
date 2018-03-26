#!\usr\bin\python
import mysql.connector as mariadb
import csv

mariadb_connection = mariadb.connect(user='cfuser', password='cfs3cr3t', database='cidadaofiscal', port='38306')
cursor = mariadb_connection.cursor()

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
                despesa_data DATE   ,
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

with open('cf_alepe_data.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    isDataRow = False
    for row in spamreader:
        if isDataRow:
            cursor.execute("""INSERT INTO cf_alepe (parlamentar_fantasia, 
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
        isDataRow = True;
cursor.close()
mariadb_connection.commit()
mariadb_connection.close()