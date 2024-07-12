import "./Aujourdhui.css";


export default function Aujourdhui () {
    return (
        <>
            <div className="blocPrincipal">
                <div className="ruban">
                    <p>Laval, QC</p>
                    <p>3:10 pm</p>
                </div>
                
                <h2>Nuageux</h2>
                <div className="tempCourant">
                    <h1>30°</h1>
                    <p>C</p>
                </div>
                
                <div className="sentComme">
                    <p>Sent comme</p>
                    <h3>33°</h3>
                    <p>C</p>
                </div>
                
                

                
            </div>

            <div className="blocSecondaire">
                <p>Vent</p>
                <h2>NE 14 km/h</h2>
                <hr></hr>
            </div>
        </>
    )
};