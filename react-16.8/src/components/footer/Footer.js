import Link from "@mui/material/Link";
import './../../styles/footer.css'

export default function Footer() {
    return (

        <div className="footer">
            <Link href="#" underline="none">
                Privacy Policy.
            </Link>
            | © 2022 HighRadius Corporation. All rights reserved.
        </div>
    );
};

