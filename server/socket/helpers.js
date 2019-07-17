export function findUserSocket (io, userId) {
  let clients = io.sockets.sockets;

  for (let client in clients) {
    const recipient = clients[client];

    if (recipient.userId !== userId) {
      return recipient
    } else {
      continue;
    }
  }
}