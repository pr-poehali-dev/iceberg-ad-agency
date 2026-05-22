import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет отзыв от клиента в базу данных со статусом 'pending' (ожидает проверки)."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    full_name = (body.get('full_name') or '').strip()
    email = (body.get('email') or '').strip()
    organization = (body.get('organization') or '').strip()
    phone = (body.get('phone') or '').strip()
    text = (body.get('text') or '').strip()

    if not all([full_name, email, organization, phone, text]):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Все поля обязательны'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO reviews (full_name, email, organization, phone, text, status) VALUES (%s, %s, %s, %s, %s, 'pending')",
        (full_name, email, organization, phone, text)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
