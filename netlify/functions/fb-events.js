import fetch from 'node-fetch';

export async function handler() {
  const PAGE_ID      = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
  const url = `https://graph.facebook.com/v16.0/${PAGE_ID}/events?` +
    new URLSearchParams({
      fields: 'id,name,cover,place,start_time,description',
      access_token: ACCESS_TOKEN
    });

  const res  = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data.data || [])
  };
}
