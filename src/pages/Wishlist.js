import axios from 'axios'
import {useEffect, useState} from "react";
import {atomForFav} from "./PlacesToStay";
import {useAtom} from 'jotai'

function Wishlist() {

    let [favorite] = useAtom(atomForFav)

    console.log(favorite)

    return(
        <div></div>
    );
}

export default Wishlist;