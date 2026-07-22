import type {Metadata} from "next";
import {Cinzel,DM_Mono,Inter} from "next/font/google";
import "./globals.css";
import {SiteShell} from "./components/SiteShell";
const display=Cinzel({subsets:["latin"],variable:"--font-display"});const body=Inter({subsets:["latin"],variable:"--font-body"});const mono=DM_Mono({subsets:["latin"],weight:["300","400","500"],variable:"--font-mono"});
export const metadata:Metadata={title:{default:"Whole Body Presence — The Healing Portal",template:"%s — Whole Body Presence"},description:"Retreats, gatherings, practitioners, and sacred space. Fire does not consume. Fire transforms.",metadataBase:new URL("https://wholebody.community"),openGraph:{title:"Whole Body Presence",description:"Where the fire meets the body.",type:"website",images:[{url:"/og.png",width:1733,height:908,alt:"Whole Body Presence — Where the fire meets the body"}]},twitter:{card:"summary_large_image",title:"Whole Body Presence",description:"Where the fire meets the body.",images:["/og.png"]}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${display.variable} ${body.variable} ${mono.variable}`}><SiteShell>{children}</SiteShell></body></html>}
