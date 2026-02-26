import Catalogo from "@/components/catalogo/Catalogo";

export default function GuardadosPage() {
    return (
        <main>
            <Catalogo showFavoritesOnly={true} />
        </main>
    );
}
