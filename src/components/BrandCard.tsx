import { Link } from "react-router"
import { IBrand } from "../views/brand/IBrand";

const BrandCard = ({ data }: { data: IBrand }) => {

    return (
        <div className="mx-auto max-w-sm px-4 mt-6">
            <div className="card bg-base-100 shadow-sm flex flex-col items-center h-64 w-70">
                <div className="w-full h-32 dark:bg-[#FFF7ED] flex items-center justify-center rounded-t-lg">
                    <figure className="w-32 h-32 flex items-center justify-center">
                        <img
                            src={data.image?.src}
                            alt={`Imagen de la marca ${data.name}`}
                            className="max-h-full max-w-full object-contain"
                        />
                    </figure>
                </div>
                
                <div className="card-body items-start flex-1 flex flex-col justify-center text-center">
                    <h1 className="card-title">{data.name.toUpperCase()}</h1>

                </div>

                <Link to="/brand?name=xerjoff" className="btn btn-neutral mt-2 hover:btn-accent text-primary-content mb-3">Ver perfumes</Link>
            </div>

        </div>
    )
}

export default BrandCard;