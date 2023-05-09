export default (request: Request) => {
  return new Response(`Hey, from ${request.url} I'm now an Edge Function!`);
};
