export default function BuyMeACoffee() {

    return (
        <a
            href="https://www.buymeacoffee.com/aromaly"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neutral mt-2 hover:btn-accent text-primary-content fixed bottom-12 right-4 flex items-center gap-2"
        >
            <img src="/buy-me-a-coffee.svg" alt="Icono de Buy Me a Coffee" className="w-6 h-6 object-contain" />
            <span>Buy me a coffee</span>
        </a>
    )
}