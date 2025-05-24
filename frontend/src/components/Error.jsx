function Error({ error }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">An error occurred...</h1>
      <h3 className="text-xl text-red-800">{error.message}</h3>
    </div>
  );
}

export default Error;
