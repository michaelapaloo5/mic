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
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Block 1: 15€ Bonus für Visa Kreditkarte */}
        <BlockSection
          background="white"
          headline="15€ Bonus für die Visa Kreditkarte"
          subline="Jetzt Visa Kreditkarte beantragen und 15€ Bonus sichern. Weltweit kostenlos bargeldlos bezahlen und flexibel in Raten zahlen."
          bullets={[
            "Kostenlose Visa Kreditkarte für 1 Jahr",
            "Weltweit kostenlos bezahlen",
            "Flexible Ratenzahlung möglich",
          ]}
          ctas={[
            { label: "Zur Visa Kreditkarte", href: "/privatkosten/visa-kreditkarte" },
            { label: "Mehr erfahren", href: "/privatkosten/visa-kreditkarte", variant: "tertiary" },
          ]}
          illustration={{
            src: "/images/illustration-left.svg",
            alt: "Visa Kreditkarte Illustration",
            position: "left",
          }}
        />

        {/* Block 2: Gemeinschaftskonto */}
        <BlockSection
          background="grey"
          headline="Gemeinschaftskonto – gemeinsam stark"
          subline="Das Gemeinschaftskonto von DKB – perfekt für Paare, WGs und Familien. Gemeinsam einfach finanziell flexibel bleiben."
          bullets={[
            "Kostenlose Kontoführung",
            "Zwei Visa Debitkarten inklusive",
            "Gemeinsame Kontoübersicht in der App",
          ]}
          ctas={[
            { label: "Zum Gemeinschaftskonto", href: "/privatkunden/gemeinschaftskonto" },
            { label: "Mehr erfahren", href: "/privatkunden/gemeinschaftskonto", variant: "tertiary" },
          ]}
          illustration={{
            src: "/images/illustration-right.svg",
            alt: "Gemeinschaftskonto Illustration",
            position: "right",
          }}
        />

        {/* Block 3: Privatkredit Sofort */}
        <BlockSection
          background="white"
          headline="Privatkredit – bis 150.000€"
          subline="Dein Wunschkredit von der DKB. Schnell, unkompliziert und zu flexiblen Konditionen. Jetzt Wunschrate berechnen."
          bullets={[
            "Flexible Laufzeiten bis 120 Monate",
            "Sofortentscheidung online",
            "Keine versteckten Gebühren",
          ]}
          ctas={[
            { label: "Zum Privatkredit", href: "/privatkunden/privatkredit" },
            { label: "Wunschrate berechnen", href: "/privatkunden/privatkredit", variant: "tertiary" },
          ]}
          illustration={{
            src: "/images/illustration-left.svg",
            alt: "Privatkredit Illustration",
            position: "left",
          }}
        />

        {/* Block 4: Beliebte Angebote (Teaser Grid) */}
        <TeaserGrid
          headline="Beliebte Angebote"
          subline="Entdecke unsere beliebtesten Produkte und Aktionen."
          className="bg-dkb-grey"
        >
          <TeaserCard
            image="/images/teaser-1.svg"
            alt="Kinderkonto"
            overline="Konto"
            headline="Kinderkonto – kostenlos für dein Kind"
            description="Das kostenlose Girokonto für Kinder und Jugendliche. Inklusive Visa Debitkarte und DKB App."
            href="/privatkunden/kinderkonto"
          />
          <TeaserCard
            image="/images/teaser-2.svg"
            alt="Tagesgeld"
            overline="Sparen"
            headline="Tagesgeld mit 3,5% p.a."
            description="Attraktive Zinsen auf dein Tagesgeld. Flexibel verfügbar und kostenlos."
            href="/privatkunden/tagesgeld"
          />
          <TeaserCard
            image="/images/teaser-3.svg"
            alt="Freunde werben"
            overline="Aktion"
            headline="Freunde werben und bis zu 150€ sichern"
            description="Empfehle die DKB weiter und erhaltet beide einen Bonus."
            href="/freunde-werben"
          />
        </TeaserGrid>

        {/* Illustration Banner */}
        <IllustrationBanner />

        {/* Block 5: Wissen, worauf es ankommt */}
        <TeaserGrid
          headline="Wissen, worauf es ankommt"
          subline="Bleib informiert mit unseren Ratgebern und Finanzthemen."
          className="bg-white"
        >
          <TeaserCard
            image="/images/teaser-4.svg"
            alt="Finanz-Update"
            overline="Ratgeber"
            headline="Finanz-Update: Alles rund ums Geld"
            description="Aktuelle Trends und Tipps rund ums Thema Geld und Finanzen."
            href="/finanzwissen"
          />
          <TeaserCard
            image="/images/teaser-5.svg"
            alt="Kartentypen"
            overline="Karten"
            headline="Debitkarte vs. Kreditkarte – was ist der Unterschied?"
            description="Die Unterschiede einfach erklärt. Finde die passende Karte für deine Bedürfnisse."
            href="/privatkunden/karten"
          />
          <TeaserCard
            image="/images/teaser-6.svg"
            alt="AV-Depot"
            overline="Vorsorge"
            headline="Altersvorsorgedepot – jetzt clever investieren"
            description="Starte deine Altersvorsorge mit einem Depot, das zu dir passt."
            href="/privatkunden/altersvorsorge"
          />
        </TeaserGrid>

        {/* App Promo */}
        <AppPromo />
      </main>
      <Footer />
    </>
  )
}
