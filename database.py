import sqlite3

DATABASE = "database.db"

def criar_tabela_avaliacoes():

    conn = sqlite3.connect(DATABASE)    
    cursor = conn.cursor()

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS avaliacoes(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT,
        cidade TEXT,
        avaliacao INTEGER,
        comentario TEXT,

        data DATETIME DEFAULT CURRENT_TIMESTAMP

    )

    """)

    conn.commit()
    conn.close()