import { Link } from "react-router-dom";

function Footer() {
    const content = ['Product', 'Company', 'Legal'];
    return (
        <div className="pt-20">
            <div>
                {/* footer logo */}

            </div>
            <div className="flex gap-16">
                {
                    content.map(ele => (
                        <div key={ele}>
                            <p className="font-semibold" > {ele}</p>
                            {/* list of links */}
                            <Link></Link>
                        </div>
                    ))
                }
            </div >
        </div>
    )
}

export default Footer; 