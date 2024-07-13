
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
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="item">
                            <label>Lundi</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <label>

                        </label>
                    </div>
                    
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className="item">
                            <label>Mardi</label>
                        </div>
                        
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="info">
                        <label>
                        </label>
                    </div>
                    
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    )
};