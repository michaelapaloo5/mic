import Header from "@/components/Header"
import Hero from "@/components/Hero"
import BlockSection from "@/components/BlockSection"
import TeaserCard from "@/components/TeaserCard"
import TeaserGrid from "@/components/TeaserGrid"
import IllustrationBanner from "@/components/IllustrationBanner"
import AppPromo from "@/components/AppPromo"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div id="__nuxt">
      <div className="page-container flex flex-col min-h-full">
        <Header />
        <main className="pt-[52px] lg:pt-[68px]">
          <Hero />

          <BlockSection
            background="grey"
            headline="Kostenloses Gemeinschaftskonto"
            subHeadline={{
              paragraphs: ["Das perfekte Haushaltskonto für Paare oder WGs:"],
              bullets: [
                "Keine Kontoführungsgebühren bei 700 Euro Geldeingang oder wenn eine*r von euch unter 28 ist.",
                "2 kostenlose Visa Debitkarten mit Wunsch-PIN",
                "Volle Übersicht: Gemeinsame Ausgaben auf einen Blick",
              ],
            }}
            cta={{
              label: "Zum Gemeinschaftskonto",
              href: "/privatkunden/girokonto/gemeinschaftskonto?wt_mc=pk.gem.hp_m",
            }}
            illustration={{
              src: "/images/couple-phones.jpg",
              alt: "Ein Mann und eine Frau schauen auf ihre Smartphones",
              position: "right",
            }}
          />

          <BlockSection
            headline="Direkt Geld erhalten? Unser Privatkredit Sofort macht's möglich!"
            subHeadline={{
              paragraphs: [
                "Einfach vom Pool aus den Privatkredit Sofort beantragen und im Nullkommanix kann das Geld auf deinem Konto sein. Und das zu unseren günstigsten Konditionen – versprochen! Warum also noch warten?",
              ],
              bullets: [
                "Unser automatischer Best-Zinssatz",
                "Antrag und Identifikation komplett digital",
                "Sofortauszahlung nach positiver Kreditentscheidung",
              ],
            }}
            cta={{
              label: "Zum Privatkredit",
              href: "/privatkunden/kredite/privatkredit?wt_mc=pk.pd_hp_m",
            }}
            illustration={{
              src: "/images/pool.jpg",
              alt: "Zwei Männer und zwei Frauen sitzen an einem Pool",
              position: "left",
            }}
          />

          <TeaserGrid headline="Beliebte Angebote">
            <TeaserCard
              image="/images/teaser-1.jpg"
              alt="Eine Frau zeigt einem Kind etwas auf dem Smartphone"
              overline="Sparen, lernen, mitwachsen"
              headline="Kostenloses Kinderkonto"
              description="Das perfekte Konto für Kinder und Jugendliche – bereits ab 0 Jahren"
              href="/privatkunden/girokonto/kinderkonto?wt_mc=pk.u18_hp_st"
            />
            <TeaserCard
              image="/images/teaser-2.jpg"
              alt="Frau sitzt auf Stuhl und schaut auf ihr Smartphone"
              overline="Mach mehr aus deinem Geld"
              headline="Tagesgeld einfach nutzen"
              description="Leg dein Geld flexibel und verzinst an – jederzeit verfügbar."
              href="https://www.dkb.de/privatkunden/sparen/tagesgeld"
            />
            <TeaserCard
              image="/images/teaser-3.jpg"
              alt="Zwei Frauen liegen auf einer Wiese"
              overline="Freunde werben"
              headline="50 Euro einfach verdient!"
              description="Empfiehl unser kostenloses Konto und sichere dir 50 Euro – direkt auf dein Konto ausgezahlt!"
              href="https://freundewerben.dkb.de/empfehlen/1?wt_mc=pk.frwe.hp_st"
            />
          </TeaserGrid>

          <IllustrationBanner />

          <TeaserGrid
            headline="Wissen, worauf es ankommt"
            cta={{ label: "Noch mehr Finanzwissen", href: "/finanzwissen" }}
          >
            <TeaserCard
              image="/images/teaser-4.jpg"
              alt="Eine Frau mit Taucherbrille und Schnorchel"
              overline="Was ändert sich?"
              headline="Finanz-Update im Juli"
              description="Mehr Rente, Recht auf Reparatur – und noch mehr."
              href="/finanzwissen/finanznews-juli?wt_mc=pk.fw_hp_st_juli"
            />
            <TeaserCard
              image="/images/teaser-5.jpg"
              alt="Mann mit Visa Debitkarte bezahlt am Kartenlesegerät"
              overline="Finde deine passende Karte"
              headline="Kartentypen"
              description="Wir zeigen dir, was Debit-, Kredit- und Girokarten unterscheidet."
              href="/finanzwissen/das-kartenspiel-was-debit-kredit-und-girokarten-unterscheidet"
            />
            <TeaserCard
              image="/images/teaser-6.jpg"
              alt="Frau an einem Strand mit Surfbrett"
              overline="Ab 2027 gefördert vorsorgen"
              headline="Das geplante Altersvorsorgedepot"
              description="Das solltest du zur neuen Form der privaten Altersvorsorge wissen."
              href="/finanzwissen/altersvorsorgedepot?wt_mc=pk.fw_hp_st_avd"
            />
          </TeaserGrid>

          <AppPromo />
        </main>
        <Footer />
      </div>
    </div>
  )
}
