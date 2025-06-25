import io
import base64
import pandas as pd
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings

class RelatorioGraficosView(APIView):
    def get(self, request):
        # monta URL com base no settings.py
        db_url = f"postgresql+psycopg2://{settings.DATABASES['default']['USER']}:{settings.DATABASES['default']['PASSWORD']}@{settings.DATABASES['default']['HOST']}:{settings.DATABASES['default']['PORT']}/{settings.DATABASES['default']['NAME']}"
        engine = create_engine(db_url)

        # === Gráfico 1: Produtos por Categoria ===
        df_cat = pd.read_sql("""
            SELECT c.nome as categoria, COUNT(p.id) as total
            FROM estoque_produto p
            JOIN estoque_categoria c ON p.categoria_id = c.id
            GROUP BY c.nome
            ORDER BY total DESC
        """, engine)

        fig1, ax1 = plt.subplots()
        df_cat.plot(kind="bar", x="categoria", y="total", legend=False, ax=ax1, color="skyblue")
        ax1.set_title("Quantidade de Produtos por Categoria")
        plt.xticks(rotation=45)
        plt.tight_layout()
        buf1 = io.BytesIO()
        fig1.savefig(buf1, format='png')
        grafico_barras = base64.b64encode(buf1.getvalue()).decode()
        plt.close(fig1)

        # === Gráfico 2: Quantidade por Data de Validade ===
        df_lotes = pd.read_sql("SELECT data_validade, quantidade FROM estoque_lote", engine)
        df_lotes['data_validade'] = pd.to_datetime(df_lotes['data_validade'])
        df_validade = df_lotes.groupby('data_validade')['quantidade'].sum().reset_index()

        fig2, ax2 = plt.subplots()
        ax2.plot(df_validade['data_validade'], df_validade['quantidade'], marker='o')
        ax2.set_title("Quantidade por Data de Validade")
        ax2.set_xlabel("Data de Validade")
        ax2.set_ylabel("Quantidade")
        plt.xticks(rotation=45)
        plt.tight_layout()
        buf2 = io.BytesIO()
        fig2.savefig(buf2, format='png')
        grafico_linhas = base64.b64encode(buf2.getvalue()).decode()
        plt.close(fig2)

        # === Gráfico 3: Locais e Quantidade de Produtos ===
        df_locais = pd.read_sql("""
            SELECT le.nome AS local, p.nome AS produto, SUM(l.quantidade) AS total
            FROM estoque_lote l
            JOIN estoque_produto p ON l.produto_id = p.id
            JOIN estoque_localestocagem le ON l.armazenado_em_id = le.id
            GROUP BY le.nome, p.nome
            ORDER BY le.nome, p.nome
        """, engine)

        df_pivot = df_locais.pivot(index='local', columns='produto', values='total').fillna(0)
        fig3, ax3 = plt.subplots(figsize=(10, 6))
        df_pivot.plot(kind='bar', stacked=False, ax=ax3)
        ax3.set_title("Quantidade de Produtos por Local")
        ax3.set_ylabel("Quantidade")
        plt.xticks(rotation=45)
        plt.tight_layout()
        buf3 = io.BytesIO()
        fig3.savefig(buf3, format='png')
        grafico_locais = base64.b64encode(buf3.getvalue()).decode()
        plt.close(fig3)

        return Response({
            "grafico_barras": grafico_barras,
            "grafico_linhas": grafico_linhas,
            "grafico_locais": grafico_locais
        })
