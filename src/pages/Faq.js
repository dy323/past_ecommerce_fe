import {useState} from 'react';
import 'styles/guide.scss';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'components/Image';
import Logo from 'assets/images/logo/pure_logo.png';

const Faq = () => {
    const [info, setInfo] = useState(
        [
            {
                title: 'title',
                descp: 'descp',
            },
            {
                title: 'titlee',
                descp: 'descps',
            },
        ]
    )

    return (
        <div className="__guide">

            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>

            <div className="_body">
                <div className="header">
                    <p className="title">FAQ</p>
                </div>
            </div>

            <div className="_information">

                {
                    info.map((i,k)=> {
                        return (
                            <div className="faq-list" key={k}>
                                <Accordion className="faq-accordion">
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <h3 className="banner">{i.title}</h3>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p className="descp">
                                            {i.descp}
                                        </p>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Faq;