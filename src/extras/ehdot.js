import React from "react";
import '@/app/globals.css';
import Layout from "@/components/Layout/Layout";
import styles from '@/app/Styles/page.module.css';
const Käyttöehdot = () => {
    return (
        <Layout>
            <div className={styles.käyttöehdot}>
            <h1>Logistixs Palvelun Käyttöehdot</h1>

            <p><strong>Voimassa alkaen: 10.11.2024</strong></p>

            <p>Nämä käyttöehdot (jäljempänä ”Ehdot”) koskevat Logistixs-alustan (jäljempänä ”Palvelu”) käyttämistä. Palvelun tarjoaa Logistix oy (jäljempänä ”Palveluntarjoaja”). Käyttämällä Palvelua hyväksyt nämä Ehdot kokonaisuudessaan. Mikäli et hyväksy näitä Ehtoja, et voi käyttää Palvelua.</p>

            <h2>1. Palvelun Tavoite</h2>
            <p>Logistixs on digitaalinen alusta, jonka tarkoituksena on yhdistää tavaranomistajat (”Käyttäjät”) ja kuljetuspalveluntarjoajat (”Kuljetusyritykset”). Palveluntarjoaja ei itse tarjoa kuljetuspalveluja, eikä ole osapuolena tavaranomistajien ja kuljetusyritysten välisissä sopimuksissa.</p>

            <h2>2. Käyttäjätili ja Rekisteröityminen</h2>
            <h3>2.1 Tietojen Antaminen</h3>
            <p>Rekisteröityessään Palveluun Käyttäjä sitoutuu antamaan totuudenmukaiset ja ajantasaiset tiedot. Mikäli annettuja tietoja ei pidetä ajantasaisina, Palveluntarjoajalla on oikeus estää Käyttäjän pääsy Palveluun.</p>

            <h3>2.2 Tilin Käyttäjävastuu</h3>
            <p>Käyttäjä on vastuussa kaikesta tilinsä käytöstä ja tilinsä kautta tehdyistä toimista. Tilin salasana on pidettävä luottamuksellisena.</p>

            <h2>3. Palvelun Käyttöä Koskevat Rajoitukset</h2>
            <p>Käyttäjä sitoutuu käyttämään Palvelua vain lain ja nämän Ehtojen mukaisesti. Palvelun käyttäminen laittomaan tai epämoraaliseen tarkoitukseen on ehdottomasti kielletty.</p>

            <h2>4. Palveluntarjoajan Vastuunrajoitus</h2>
            <h3>4.1 Yleinen Vastuunrajoitus</h3>
            <p>Palveluntarjoaja tarjoaa Palvelun ”SELLAISENAAN” (“AS IS”) ja ”SAATAVILLA OLEVANA” (“AS AVAILABLE”) ilman minkäänlaista nimenomaista tai epäsuoraa takuuta. Palveluntarjoaja ei takaa, että Palvelu toimii keskeytyksettä, virheettömästi tai turvallisesti.</p>

            <h3>4.2 Sopimussuhteiden Ulkopuolisuus</h3>
            <p>Palveluntarjoaja ei ole osapuolena tavaranomistajien ja kuljetusyritysten välisissä sopimuksissa. Kaikki kuljetukseen liittyvät ehdot, aikataulut, hinnat ja vastuukysymykset sovitaan suoraan Käyttäjien välillä.</p>

            <h3>4.3 Vahingonkorvausvastuun Poissulkeminen</h3>
            <p>Palveluntarjoaja ei ole vastuussa mistään suorista, epäsuorista, satunnaisista, erityisistä tai välillisistä vahingoista, jotka aiheutuvat Palvelun käytöstä tai käytön estymisestä.</p>

            <h2>5. Tietosuoja ja GDPR</h2>
            <h3>5.1 Rekisterinpito</h3>
            <p>Palveluntarjoaja on EU:n yleisen tietosuoja-asetuksen (GDPR) mukainen rekisterinpitäjä. Lisätietoja käsitellyistä tiedoista ja oikeuksistasi löytyy tietosuojaselosteestamme.</p>

            <h3>5.2 Henkilötietojen Käyttö</h3>
            <p>Käyttäjä sitoutuu antamaan henkilötietonsa Palvelun toiminnan mahdollistamiseksi. Palveluntarjoaja käsittelee henkilötietoja luottamuksellisesti ja ainoastaan voimassa olevan lainsäädännön mukaisesti.</p>

            <h2>6. Riidanratkaisu ja Sovellettava Laki</h2>
            <h3>6.1 Sovellettava Laki</h3>
            <p>Näihin Ehtoihin sovelletaan Suomen lakia, poislukien lainvalintaa koskevat periaatteet.</p>

            <h3>6.2 Riidanratkaisu</h3>
            <p>Palveluntarjoajan ja Käyttäjän väliset riidat pyritään ensisijaisesti ratkaisemaan sovittelemalla. Mikäli sovittelussa ei saavuteta ratkaisua, riidat ratkaistaan Suomessa toimivaltaisessa tuomioistuimessa.</p>

            <h2>7. Ehtojen Muuttaminen</h2>
            <p>Palveluntarjoajalla on oikeus muuttaa näitä Ehtoja milloin tahansa. Muutokset astuvat voimaan, kun ne on julkaistu Palvelussa. Käyttämällä Palvelua muutosten julkaisun jälkeen hyväksyt muutetut Ehdot.</p>

            <h2>8. Yhteystiedot</h2>
            <p>Mikäli sinulla on kysyttävää näistä Ehdoista, voit ottaa yhteyttä osoitteeseen info@logistix.fi</p>

            <hr />
            <p>Nämä käyttöehdot muodostavat sitovan sopimuksen sinun ja Logistixin välillä. Lue ne huolellisesti ennen Palvelun käyttämistä.</p>
        </div>
        </Layout>
        
    );
};

export default Käyttöehdot;
