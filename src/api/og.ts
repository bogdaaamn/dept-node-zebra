export default (request: Request) => {
  return new Response(`Heyyy, from ${request.url} I'm now an Edge Function!`);
};
