import "./Quotidien.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

export default function Quotidien() {
    const journees = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    return (
        <Accordion allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="item">
                            <label className="heure">11 AM</label>
                            <label className="temp">30°</label>
                            <label className="paysage">Nuageux</label>
                            <label className="precipitation">58%</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <hr></hr>
                        <label>

                        </label>
                    </div>
                    
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="item">
                            <label className="heure">12 PM</label>
                            <label className="temp">31°</label>
                            <label className="paysage">Nuageux</label>
                            <label className="precipitation">40%</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <hr></hr>
                        <label>
                        </label>
                    </div>
                    
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
};