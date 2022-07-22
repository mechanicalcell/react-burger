export const socketMiddleware = (wsUrl: string, wsActions: {
    wsInit: string,
    wsSendMessage: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string,
  }) => {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event; 
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};