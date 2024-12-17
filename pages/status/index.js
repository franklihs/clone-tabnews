import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let version = "Carregando...";
  let maxConnections = "Carregando...";
  let openedConnections = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    const { dependencies } = data;
    const { database } = dependencies;
    version = database.version;
    maxConnections = database.max_connections;
    openedConnections = database.opened_connections;
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
      <h1></h1>
      <div>Versão do Banco de Dados: {version}</div>
      <div>Máximo de conexões permitidas: {maxConnections}</div>
      <div>Conexões abertas atualmente: {openedConnections}</div>
    </>
  );
}
