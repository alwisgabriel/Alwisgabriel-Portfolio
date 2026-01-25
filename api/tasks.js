let tasks = [];
let idAtual = 1;

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    return res.status(200).json(tasks);
  }

  if (method === "POST") {
    const { texto } = req.body;

    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const novaTarefa = {
      id: idAtual++,
      texto,
      hora,
      status: "pendente"
    };

    tasks.push(novaTarefa);
    return res.status(201).json(novaTarefa);
  }

  if (method === "PUT") {
    const { id, texto, status } = req.body;
    const tarefa = tasks.find(t => t.id === id);
    if (!tarefa) return res.status(404).end();

    if (texto !== undefined) tarefa.texto = texto;
    if (status !== undefined) tarefa.status = status;

    return res.status(200).json(tarefa);
  }

  if (method === "DELETE") {
    const { id } = req.body;
    tasks = tasks.filter(t => t.id !== id);
    return res.status(204).end();
  }

  res.status(405).end();
}
