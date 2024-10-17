/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
	  const apiKey = '67960e95c188075218c924fc3a32a3d4'; 
	  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  
	  const requestUrl = new URL(request.url);
	  if (requestUrl.searchParams.has('lat') && requestUrl.searchParams.has('lon')) {
		url.searchParams.set('lat', requestUrl.searchParams.get('lat'));
		url.searchParams.set('lon', requestUrl.searchParams.get('lon'));
	  } else if (requestUrl.searchParams.has('q')) {
		url.searchParams.set('q', requestUrl.searchParams.get('q'));
	  } else {
		return new Response("Missing query parameters", { status: 400 });
	  }
	
	  url.searchParams.set('appid', apiKey);
	  const modifiedRequest = new Request(url, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		}
	  });
	
	  try {
		const response = await fetch(modifiedRequest);
		const newHeaders = new Headers(response.headers);
		newHeaders.set('Access-Control-Allow-Origin', '*');
	
		return new Response(response.body, {
		  status: response.status,
		  statusText: response.statusText,
		  headers: newHeaders
		});
	  } catch (error) {
		return new Response("Error fetching weather data", { status: 500 });
	  }
	}
  };