import { Link, useParams } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, ButtonGroup, Button } from 'reactstrap'

// ** Icons Import
import { Facebook, Twitter, Instagram, Link2, Mail, Send } from 'react-feather'

// ** Images
import illustration from '@src/assets/images/banner/banner-7.jpg'

const CardInvite = () => {

    const { eventId } = useParams()

    return (
        <Card>
            <CardHeader>Invitation Details</CardHeader>
            <div className="d-flex flex-column ms-2">
                <div className="pb-1">
                    <img src={illustration} height="85" />
                </div>
                <div className="d-flex flex-column">
                    <span className="h4 bold fw-bold">Developer Meetup</span>
                    <Link to={`/event-preview/${eventId}`}>
                        <span>Preview Invitation</span>
                    </Link>
                </div>
            </div>

            <CardBody>
                <div className="mb-1">
                    <div className="h4">Send Invitation</div>
                    <ButtonGroup className="mb-1">
                        <Button outline color="primary">
                            <Link2 size={15} />
                        </Button>
                        <Button outline color="primary">
                            <Mail size={15} />
                        </Button>
                        <Button outline color="primary">
                            <Send size={15} />
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    <div className="h4">Share Your Event</div>
                    <ButtonGroup className="mb-1">
                        <Button outline color="primary">
                            <Facebook size={15} />
                        </Button>
                        <Button outline color="primary">
                            <Twitter size={15} />
                        </Button>
                        <Button outline color="primary">
                            <Instagram size={15} />
                        </Button>
                    </ButtonGroup>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardInvite
