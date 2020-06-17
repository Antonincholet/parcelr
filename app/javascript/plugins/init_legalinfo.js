const initLegalInfo = () => {
const legalInfo = document.getElementById('legalinfo');

if (legalInfo) {
  const coordinates = legalInfo.dataset.coordinates
  const infoUrba = {}
  fetch(`https://apicarto.ign.fr/api/gpu/all?geom={"type": "Point","coordinates":${coordinates}}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data[0].features[0]) {
        infoUrba['is_rnu'] = data[0].features[0].properties.is_rnu;
      };
      if (data[1].features[0]) {
        infoUrba['plu'] = data[1].features[0].properties.du_type;
        infoUrba['plu_title'] = data[1].features[0].properties.grid_title;
        infoUrba['plu_zone'] = data[2].features[0].properties.libelle;
        infoUrba['plu_zone_libelle'] = data[2].features[0].properties.libelong;
      };
      if (data[6].features[0]) {
        infoUrba['SUP'] = []
        data[6].features.forEach((element) => {
          infoUrba['SUP'].push(element.properties.libelle)
        })
      };

      const rnu = document.getElementById('rnu')
      if (infoUrba['is_rnu']) {
        rnu.innerText = "La parcelle est soumise aux prescriptions du Règlement national d'urbanisme"
      } else {
        rnu.innerText = "La parcelle n'est pas soumise aux prescriptions du Règlement national d'urbanisme"
      }

      const plu = document.getElementById('plu')
      if (infoUrba['plu'] == "PLU") {
        plu.innerHTML = `La parcelle est en <strong>zone ${infoUrba['plu_zone']}</strong> ( ${infoUrba['plu_zone_libelle']} ) définie au Plan local d'urbanisme`
      } else if (infoUrba['plu'] == "PLUi") {
        plu.innerHTML = `La parcelle est en <strong>zone ${infoUrba['plu_zone']}</strong> ( ${infoUrba['plu_zone_libelle']} ) définie au Plan local d'urbanisme intercommunal`
      } else {
        plu.innerHTML = "La parcelle n'est pas soumise aux prescriptions d'un Plan local d'urbanisme"
      }

      const sup = document.getElementById('sup')
      if (infoUrba['SUP'] != null) {
        sup.innerHTML = `La parcelle est soumise aux servitudes d'utilité publique suivantes : <ul id="supli"></ul>`

        const supli = document.getElementById('supli')
        infoUrba['SUP'].forEach( element => {
            if (element != null) {
            supli.insertAdjacentHTML('beforeend', `<li>- ${element};</li>`);
            }
          })
      }
    })
  }
}

export { initLegalInfo }
