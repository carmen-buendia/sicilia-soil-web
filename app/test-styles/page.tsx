import { Link } from "lucide-react";

export default function TestStylesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-charcoalGray mb-6">
        Prueba de Estilos
      </h1>

      <div className="space-y-4">
        <div className="p-4 bg-oliveGreen text-white rounded-lg">
          Esto debería ser verde oliva (#5A6B47)
        </div>

        <div className="p-4 bg-wheatGold text-charcoalGray rounded-lg">
          Esto debería ser amarillo trigo (#E6B422)
        </div>

        <div className="p-4 bg-offWhite border rounded-lg">
          Esto debería ser blanco roto (#FDFBF7)
        </div>

        <div className="p-4 bg-sicilian-red text-white rounded-lg">
          Esto debería ser rojo Sicilia (#CD212A)
        </div>

        <div className="grid grid-cols-5 gap-2 mt-4">
          <div className="h-10 bg-oliveGreen rounded"></div>
          <div className="h-10 bg-wheatGold rounded"></div>
          <div className="h-10 bg-offWhite rounded border"></div>
          <div className="h-10 bg-charcoalGray rounded"></div>
          <div className="h-10 bg-sicilian-red rounded"></div>
        </div>

        <p className="text-oliveGreen mt-4">
          Si ves todos los colores, Tailwind está funcionando correctamente.
        </p>
      </div>

      <Link
        href="/"
        className="inline-block mt-8 text-oliveGreen hover:underline"
      >
        ← Volver al Dashboard
      </Link>
    </div>
  );
}
