import React from 'react';
import { useState } from 'react/cjs/react.development';

const newDish = () => {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [region, setRegion] = useState();
    const [regionId, setRegionId] = useState();


    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    
    const handleRegion = (e) => {
        setRegion(e.target.value);
    };


    return (
        <div>
            <div>
                <label>Titre</label>
                <input
                onChange={handleTitle}
                value={title}
                type="text"
                />
            </div>
            <div>
                <label>Description</label>
                <input 
                onChange={handleDescription}
                value={description}
                type="text" />
            </div>
            <div>
                <label>Region</label>
                <select name="pays">
                <option value="afghanistan">Afghanistan</option>
                <option value="afrique-du-sud">Afrique du Sud</option>
                <option value="albanie">Albanie</option>
                <option value="algerie">Algérie</option>
                <option value="allemagne">Allemagne</option>
                <option value="ancienne-republique-yougoslave-de-macedoine">Ancienne République yougoslave de Macédoine</option>
                <option value="andorre">Andorre</option>
                <option value="angola">Angola</option>
                <option value="anguilla">Anguilla</option>
                <option value="antarctique">Antarctique</option>
                <option value="antigua-et-barbuda">Antigua-et-Barbuda</option>
                <option value="antilles-neerlandaises">Antilles néerlandaises</option>
                <option value="arabie-saoudite">Arabie saoudite</option>
                <option value="argentine">Argentine</option>
                <option value="armenie">Arménie</option>
                <option value="aruba">Aruba</option>
                <option value="australie">Australie</option>
                <option value="autriche">Autriche</option>
                <option value="azerbaidjan">Azerbaïdjan</option>
                <option value="bahamas">Bahamas</option>
                <option value="bahrein">Bahreïn</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="barbade">Barbade</option>
                <option value="belgique">Belgique</option>
                <option value="belize">Belize</option>
                <option value="benin">Bénin</option>
                <option value="bermudes">Bermudes</option>
                <option value="bhoutan">Bhoutan</option>
                <option value="bielorussie">Biélorussie</option>
                <option value="bolivie">Bolivie</option>
                <option value="bosnie-et-herzegovine">Bosnie-et-Herzégovine</option>
                <option value="botswana">Botswana</option>
                <option value="bresil">Brésil</option>
                <option value="brunei-darussalam">Brunei Darussalam</option>
                <option value="bulgarie">Bulgarie</option>
                <option value="burkina-faso">Burkina Faso</option>
                <option value="burundi">Burundi</option>
                <option value="cambodge">Cambodge</option>
                <option value="cameroun">Cameroun</option>
                <option value="canada">Canada</option>
                <option value="cap-vert">Cap-Vert</option>
                <option value="chili">Chili</option>
                <option value="chine">Chine</option>
                <option value="chypre">Chypre</option>
                <option value="colombie">Colombie</option>
                <option value="comores">Comores</option>
                <option value="congo">Congo</option>
                <option value="costa-rica">Costa Rica</option>
                <option value="cote-d-ivoire">Côte d'Ivoire</option>
                <option value="croatie">Croatie</option>
                <option value="cuba">Cuba</option>
                <option value="danemark">Danemark</option>
                <option value="djibouti">Djibouti</option>
                <option value="dominique">Dominique</option>
                <option value="egypte">Égypte</option>
                <option value="el-salvador">El Salvador</option>
                <option value="emirats-arabes-unis">Émirats arabes unis</option>
                <option value="equateur">Équateur</option>
                <option value="erythree">Érythrée</option>
                <option value="espagne">Espagne</option>
                <option value="estonie">Estonie</option>
                <option value="etats-federes-de-micronesie">États fédérés de Micronésie</option>
                <option value="etats-unis">États-Unis</option>
                <option value="ethiopie">Éthiopie</option>
                <option value="fidji">Fidji</option>
                <option value="finlande">Finlande</option>
                <option value="france">France</option>
                <option value="gabon">Gabon</option>
                <option value="gambie">Gambie</option>
                <option value="georgie">Géorgie</option>
                <option value="georgie-du-sud-et-les-iles-sandwich-du-sud">Géorgie du Sud-et-les Îles Sandwich du Sud</option>
                <option value="ghana">Ghana</option>
                <option value="gibraltar">Gibraltar</option>
                <option value="grece">Grèce</option>
                <option value="grenade">Grenade</option>
                <option value="groenland">Groenland</option>
                <option value="guadeloupe">Guadeloupe</option>
                <option value="guam">Guam</option>
                <option value="guatemala">Guatemala</option>
                <option value="guinee">Guinée</option>
                <option value="guinee-equatoriale">Guinée équatoriale</option>
                <option value="guinee-bissau">Guinée-Bissau</option>
                <option value="guyane">Guyane</option>
                <option value="guyane-francaise">Guyane française</option>
                <option value="haiti">Haïti</option>
                <option value="honduras">Honduras</option>
                <option value="hong-kong">Hong Kong</option>
                <option value="hongrie">Hongrie</option>
                <option value="ile-bouvet">Ile Bouvet</option>
                <option value="ile-christmas">Ile Christmas</option>
                <option value="ile-norfolk">Île Norfolk</option>
                <option value="ile-pitcairn">Île Pitcairn</option>
                <option value="iles-aland">Iles Aland</option>
                <option value="iles-cayman">Iles Cayman</option>
                <option value="iles-cocos-keeling">Iles Cocos (Keeling)</option>
                <option value="iles-cook">Iles Cook</option>
                <option value="iles-feroe">Îles Féroé</option>
                <option value="iles-heard-et-macdonald">Îles Heard-et-MacDonald</option>
                <option value="iles-malouines">Îles Malouines</option>
                <option value="iles-mariannes-du-nord">Îles Mariannes du Nord</option>
                <option value="iles-marshall">Îles Marshall</option>
                <option value="iles-mineures-eloignees-des-etats-unis">Îles mineures éloignées des États-Unis</option>
                <option value="iles-salomon">Îles Salomon</option>
                <option value="iles-turques-et-caiques">Îles Turques-et-Caïques</option>
                <option value="iles-vierges-britanniques">Îles Vierges britanniques</option>
                <option value="iles-vierges-des-etats-unis">Îles Vierges des États-Unis</option>
                <option value="inde">Inde</option>
                <option value="indonesie">Indonésie</option>
                <option value="iraq">Iraq</option>
                <option value="irlande">Irlande</option>
                <option value="islande">Islande</option>
                <option value="israel">Israël</option>
                <option value="italie">Italie</option>
                <option value="jamahiriya-arabe-libyenne">Jamahiriya arabe libyenne</option>
                <option value="jamaique">Jamaïque</option>
                <option value="japon">Japon</option>
                <option value="jordanie">Jordanie</option>
                <option value="kazakhstan">Kazakhstan</option>
                <option value="kenya">Kenya</option>
                <option value="kirghizistan">Kirghizistan</option>
                <option value="kiribati">Kiribati</option>
                <option value="koweit">Koweït</option>
                <option value="lesotho">Lesotho</option>
                <option value="lettonie">Lettonie</option>
                <option value="liban">Liban</option>
                <option value="liberia">Libéria</option>
                <option value="liechtenstein">Liechtenstein</option>
                <option value="lituanie">Lituanie</option>
                <option value="luxembourg">Luxembourg</option>
                <option value="macao">Macao</option>
                <option value="madagascar">Madagascar</option>
                <option value="malaisie">Malaisie</option>
                <option value="malawi">Malawi</option>
                <option value="maldives">Maldives</option>
                <option value="mali">Mali</option>
                <option value="malte">Malte</option>
                <option value="maroc">Maroc</option>
                <option value="martinique">Martinique</option>
                <option value="maurice">Maurice</option>
                <option value="mauritanie">Mauritanie</option>
                <option value="mayotte">Mayotte</option>
                <option value="mexique">Mexique</option>
                <option value="monaco">Monaco</option>
                <option value="mongolie">Mongolie</option>
                <option value="montserrat">Montserrat</option>
                <option value="mozambique">Mozambique</option>
                <option value="myanmar">Myanmar</option>
                <option value="namibie">Namibie</option>
                <option value="nauru">Nauru</option>
                <option value="nepal">Népal</option>
                <option value="nicaragua">Nicaragua</option>
                <option value="niger">Niger</option>
                <option value="nigeria">Nigéria</option>
                <option value="niue">Niué</option>
                <option value="norvege">Norvège</option>
                <option value="nouvelle-caledonie">Nouvelle-Calédonie</option>
                <option value="nouvelle-zelande">Nouvelle-Zélande</option>
                <option value="oman">Oman</option>
                <option value="ouganda">Ouganda</option>
                <option value="ouzbekistan">Ouzbékistan</option>
                <option value="pakistan">Pakistan</option>
                <option value="palaos">Palaos</option>
                <option value="panama">Panama</option>
                <option value="papouasie-nouvelle-guinee">Papouasie-Nouvelle-Guinée</option>
                <option value="paraguay">Paraguay</option>
                <option value="pays-bas">Pays-Bas</option>
                <option value="perou">Pérou</option>
                <option value="philippines">Philippines</option>
                <option value="pologne">Pologne</option>
                <option value="polynesie-francaise">Polynésie française</option>
                <option value="porto-rico">Porto Rico</option>
                <option value="portugal">Portugal</option>
                <option value="province-chinoise-de-taiwan">Province chinoise de Taiwan</option>
                <option value="qatar">Qatar</option>
                <option value="republique-arabe-syrienne">République arabe syrienne</option>
                <option value="republique-centrafricaine">République centrafricaine</option>
                <option value="republique-de-coree">République de Corée</option>
                <option value="republique-de-moldavie">République de Moldavie</option>
                <option value="republique-democratique-du-congo">République démocratique du Congo</option>
                <option value="republique-dominicaine">République dominicaine</option>
                <option value="republique-islamique-d-iran">République islamique d'Iran</option>
                <option value="republique-populaire-democratique-de-coree">République populaire démocratique de Corée</option>
                <option value="republique-populaire-du-laos">République Populaire du Laos</option>
                <option value="republique-tcheque">République tchèque</option>
                <option value="republique-unie-de-tanzanie">République-Unie de Tanzanie</option>
                <option value="reunion">Réunion</option>
                <option value="roumanie">Roumanie</option>
                <option value="royaume-uni">Royaume-Uni</option>
                <option value="russie">Russie</option>
                <option value="rwanda">Rwanda</option>
                <option value="sahara-occidental">Sahara occidental</option>
                <option value="saint-christophe-et-nieves">Saint-Christophe-et-Niévès</option>
                <option value="saint-marin">Saint-Marin</option>
                <option value="saint-pierre-et-miquelon">Saint-Pierre-et-Miquelon</option>
                <option value="saint-siege-cite-du-vatican">Saint-Siège (Cité du Vatican)</option>
                <option value="saint-vincent-et-les-grenadines">Saint-Vincent-et-les Grenadines</option>
                <option value="sainte-helene">Sainte-Hélène</option>
                <option value="sainte-lucie">Sainte-Lucie</option>
                <option value="samoa">Samoa</option>
                <option value="samoa-americaines">Samoa américaines</option>
                <option value="sao-tome-et-principe">Sao Tomé-et-Principe</option>
                <option value="senegal">Sénégal</option>
                <option value="serbie-et-montenegro">Serbie-et-Monténégro</option>
                <option value="seychelles">Seychelles</option>
                <option value="sierra-leone">Sierra Leone</option>
                <option value="singapour">Singapour</option>
                <option value="slovaquie">Slovaquie</option>
                <option value="slovenie">Slovénie</option>
                <option value="somalie">Somalie</option>
                <option value="soudan">Soudan</option>
                <option value="sri-lanka">Sri Lanka</option>
                <option value="suede">Suède</option>
                <option value="suisse">Suisse</option>
                <option value="suriname">Suriname</option>
                <option value="svalbard-et-jan-mayen">Svalbard et Jan Mayen</option>
                <option value="swaziland">Swaziland</option>
                <option value="tadjikistan">Tadjikistan</option>
                <option value="tchad">Tchad</option>
                <option value="territoire-britannique-de-l-ocean-indien">Territoire britannique de l'océan Indien</option>
                <option value="territoire-francais-du-sud">Territoire Francais du Sud</option>
                <option value="territoires-palestiniens-occupes">Territoires palestiniens occupés</option>
                <option value="thailande">Thaïlande</option>
                <option value="timor-oriental">Timor oriental</option>
                <option value="togo">Togo</option>
                <option value="tokelau">Tokelau</option>
                <option value="tonga">Tonga</option>
                <option value="trinite-et-tobago">Trinité-et-Tobago</option>
                <option value="tunisie">Tunisie</option>
                <option value="turkmenistan">Turkménistan</option>
                <option value="turquie">Turquie</option>
                <option value="tuvalu">Tuvalu</option>
                <option value="ukraine">Ukraine</option>
                <option value="uruguay">Uruguay</option>
                <option value="vanuatu">Vanuatu</option>
                <option value="venezuela">Vénézuéla</option>
                <option value="vietnam">Vietnam</option>
                <option value="wallis-et-futuna">Wallis-et-Futuna</option>
                <option value="yemen">Yémen</option>
                <option value="zambie">Zambie</option>
                <option value="zimbabwe">Zimbabwe</option>
            </select>
            </div>
            <button type="submit" className="btn btn-primary my-3">
                Créer un plat
            </button> 
        </div>
    );
};

export default newDish;