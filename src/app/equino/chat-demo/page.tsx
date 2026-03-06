import { ChatPanel } from "@/components/chat/ChatPanel";

/**
 * Example page demonstrating the ChatPanel component
 *
 * Usage:
 * 1. Start the backend server (Spring Boot on port 8080)
 * 2. Navigate to this page
 * 3. The chat will automatically connect and join
 */
export default function ChatExamplePage() {
  // In a real application, these values would come from:
  // - horseId: URL params or route context
  // - currentUsername: authenticated user session

  const horseId = "demo-horse-123";
  const currentUsername = "Usuario Demo";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            HorseTrust Chat Demo
          </h1>
          <p className="text-slate-600">
            Sistema de chat en tiempo real para listados verificados
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            ℹ️ Información de Conexión
          </h2>
          <div className="space-y-1 text-sm text-blue-800">
            <p>
              <strong>Horse ID:</strong> {horseId}
            </p>
            <p>
              <strong>Usuario:</strong> {currentUsername}
            </p>
            <p>
              <strong>Backend:</strong> http://localhost:8080
            </p>
            <p>
              <strong>Endpoint:</strong> /ws-horse
            </p>
          </div>
        </div>

        {/* Chat Panel */}
        <ChatPanel horseId={horseId} currentUsername={currentUsername} />

        {/* Instructions */}
        <div className="mt-6 p-6 bg-white border border-slate-200 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            📋 Instrucciones de Prueba
          </h3>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>
              Asegúrate de que el backend Spring Boot esté ejecutándose en el
              puerto 8080
            </li>
            <li>
              Abre esta página en múltiples pestañas para simular varios
              usuarios
            </li>
            <li>
              Envía mensajes desde una pestaña y observa cómo aparecen en todas
            </li>
            <li>
              Revisa la consola del navegador para ver los logs de WebSocket
            </li>
            <li>
              Detén el backend para probar el manejo de errores y reconexión
            </li>
          </ol>
        </div>

        {/* Technical Details */}
        <div className="mt-6 p-6 bg-slate-800 text-slate-100 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">🔧 Detalles Técnicos</h3>
          <div className="space-y-2 text-sm font-mono">
            <p>
              <span className="text-green-400">✓</span> STOMP over SockJS
            </p>
            <p>
              <span className="text-green-400">✓</span> Auto-reconnect habilitado
            </p>
            <p>
              <span className="text-green-400">✓</span> Validación de mensajes
              (max 1000 chars)
            </p>
            <p>
              <span className="text-green-400">✓</span> Timestamps del servidor
            </p>
            <p>
              <span className="text-green-400">✓</span> Eventos JOIN/LEAVE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

