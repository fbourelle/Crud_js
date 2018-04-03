let facture_id = 0;
let factures= [
    {
	client:{
        id:'1',
		nom:'Bourelle',
		adresse:{rue:'18 rue de l\'ancienne église', code_postal:'44830', ville:'Bouaye'},
		siret:'44962821300059',
		contacts:{
			nom_contact:'Bourelle',
			mail_contact:'frederic.bourelle@gmail.com',
			tel:'0952288746',
			mobile:'0631843820'},
        },
	type_prestation:'app',
	libelle:'app_bourelle',
	montant:'25',
	tva:'19.6',
	date_prestation:'23/02/2018',
	date_facture:'24/02/2018',
	date_reglement:'28/02/2018',
	date_relance:'',
    },
    {
	client:{
        id:'2',
		nom:'Falempin',
		adresse:{rue:'20 rue des Hortensias', code_postal:'60000', ville:'Beauvais'},
		siret:'44962821300060',
		contacts:{
			nom_contact:'Falempin',
			mail_contact:'falempin.odette@laposte.net',
			tel:'0344483546',
			mobile:'0631843825'},
        },
	type_prestation:'web',
	libelle:'web_falempin',
	montant:'1200',
	tva:'20',
	date_prestation:'10/01/2017',
	date_facture:'20/01/2017',
	date_reglement:'02/02/2017',
	date_relance:'',
    },
    {
	client:{
        id:'3',
		nom:'Colin',
		adresse:{rue:'52 rue Desgrées du lou', code_postal:'44100', ville:'Nantes'},
		siret:'44962821300055',
		contacts:{
			nom_contact:'Colin',
			mail_contact:'colin_severine@hotmail.fr',
			tel:'0952288748',
			mobile:'0694686461'},
        },
	type_prestation:'print',
	libelle:'print_colin',
	montant:'250',
	tva:'7.8',
	date_prestation:'01/03/2018',
	date_facture:'02/03/2018',
	date_reglement:'29/03/2018',
	date_relance:'',
    }
    ];
//enregistrement et lecture en localStorage

function get_factures(){

	//enregistrement dans localStorage

	if (
		(!localStorage.factures)||
		(localStorage.factures == '')||
		(localStorage.factures == null)||
		(localStorage.factures.length == 0)||
		(localStorage.factures == '[]')
	) {

		(confirm('Impossible de trouver la sauvegarde ! Réinitialiser les factures ?')) ? localStorage.factures = JSON.stringify(factures) : factures = JSON.parse(localStorage.factures);

	} else factures = JSON.parse(localStorage.factures); //lecture depuis le menu contenu dans localStorage
}

function listeFactures(){
	let flow='<div><table class="table table-striped table-dark table-bordered"> <thead class="thead-light"><th scope="col">Entreprise</th><th scope="col">Prestation</th><th scope="col">Montant HT</th><th scope="col">Montant TTC</th><th scope="col">TVA</th><th scope="col">Date prestation</th><th scope="col">Date facture</th><th scope="col">Date réglement</th><th scope="col">Contacts</th><th scope="col">Visualiser</th><th scope="col">Modifier</th></thead>';
	for ( i in  factures ){
        flow+='<tr><td>';      
		flow+=factures[i].client.nom+'<br>'+factures[i].client.siret+'</td><td>';
        flow+=factures[i].type_prestation+' </td><td>';
        flow+=factures[i].montant+' €</td><td>';
        flow+=(((factures[i].montant*factures[i].tva)/100)+parseFloat(factures[i].montant))+' €</td><td>';
        flow+=factures[i].tva+'</td><td>';
        flow+=factures[i].date_prestation+'</td><td>'
        flow+=factures[i].date_facture+'</td><td>'
        flow+=factures[i].date_reglement+'</td>'
        flow+=`<td><a href="#"><i class="material-icons" id ="contact_`+factures[i].client.id+`" data-toggle="modal" data-target="#Modal_contact_`+factures[i].client.id+`" title="Afficher les contacts de `+factures[i].client.nom+`" >group</i></a></td>`
        flow+=`<td><a href="#"><i class="material-icons" id="view_`+factures[i].client.id+`" data-toggle="modal" data-target="#Modal_view_`+factures[i].client.id+`" title="Afficher la facture de `+factures[i].client.nom+`">visibility</i></a></td>
        <td><a href="#"><i class="material-icons" id="update_`+factures[i].client.id+`" data-toggle="modal" data-target="#Modal_update_`+factures[i].client.id+`" title="Modifier la facture de `+factures[i].client.nom+`">mode_edit</i></a></td></tr>`;
	}
	flow+='</table></div>';
	$('main').html(flow);
}

function deleteFacture(){
    let flow = `<div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="nom">Nom du client</label></div>
                <select class="custom-select" id="nom">
                <option selected>Choose...</option>`;
    for (i in factures){
        flow +=`<option value="`+i+`">`+factures[i].client.nom+`</option>`;
    }
    flow+=`</select></div></div>`
    return flow;
}

let deleteFacturehtml = deleteFacture();

function affiche_ClientAdresse() {
    
    $('#choix_client').on('change', function(e){
        let client_select ='';
        let rue_value ='';
        let codepostal_value ='';
        let ville_value ='';
        let siret_value ='';
        client_select = $(this).val();
        let i = 0;
            while (i < factures.length) {
                if (factures[i].client.nom == client_select) {
                rue_value = factures[i].client.adresse.rue;
                codepostal_value = factures[i].client.adresse.code_postal;
                ville_value = factures[i].client.adresse.ville;
                siret_value =factures[i].client.siret;
                let AdresseHtml = createFacture(rue_value, codepostal_value, ville_value,siret_value);
                return $('#clientAdresse').html(AdresseHtml);
                }
                else {
                    rue_value ='';
                    codepostal_value ='';
                    ville_value ='';
                    siret_value ='';
                    i++; 
                }                
            }
            let AdresseHtml = createFacture(rue_value, codepostal_value, ville_value,siret_value);
            return $('#clientAdresse').html(AdresseHtml);         
        }); 
}

function affiche_Client(){
    let flow = `<form id="formAddFacture">
                <div class="form-group" id="formClient">
                <label for="dataclient" id="labelclient">Nom du client</label><br>
                <input list="dataclient" type="text" id="choix_client" name="nom"><datalist id="dataclient">`;
    let client_Temp = ['0'];
    
    console.log(client_Temp.length);
    for (j in factures) {
        console.log('j = '+ j);
        let client_Temp_Length = client_Temp.length;
        console.log('client-temp.length = ' + client_Temp_Length);
        for (var i=j; i < client_Temp_Length; i++) {           
            if (client_Temp[i] != factures[j].client.nom) {
//                if (i == 0) client_Temp[i] = factures[j].client.nom; 
                flow+=`<option value="${factures[j].client.nom}">`;
                client_Temp.push(factures[j].client.nom);
//                console.log(client_Temp);
            }
        }
        
    }
    console.log(client_Temp);
//    console.log(client_Temp);
    flow+=`</datalist></div><div id="clientAdresse"></div>
            <div class="form-group">
            <label for="prestation">Prestation</label>
            <select name="prestation" id="prestation">
            <option value="app" selected>App</option>
            <option value="web">Web</option>
            <option value="print">Print</option>
            </select>
            </div>
            <div class="form-group">
            <label for="libelle">Libellé</label>
            <input type="text" class="form-control" name="libelle" placeholder="Libellé">
            </div>
            <div class="form-group">
            <label for="montant">Montant HT</label>
            <input type="number" min=0 class="form-control" name="montantHT" id="montant_ht" value=0>
            </div>
            <div class="form-group">
            <label for="tva" >TVA</label>
            <div id="tva_id"></div>
            </div>
            <div class="form-group">
            <label for="montant_TTC" >Montant TTC</label>
            <div id="montant_ttc_id"></div>
            </div>
            <div class="form-group">
            <label for="date_prestation" >Date de prestation</label>
            <input type="date" name="date_prestation">
            </div>
            <div class="form-group">
            <label for="date_facture" >Date de facturation</label>
            <input type="date" name="date_facture">
            </div>
            <div class="form-group">
            <label for="date_reglement" >Date de réglement</label>
            <input type="date" name="date_reglement">
            </div>     
            </form>`;
    return flow;
};

function change_Tva(){
    $('#prestation').on('change', function(e){
        let tva_val = $(this).val();
    switch (tva_val) {
        case 'app':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva" id="tvaid" value="19.26" disabled="disabled">'), calcul_TTC();
            break;         
        case 'web':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva"  id="tvaid" value="20" disabled="disabled">'), calcul_TTC();
            break;
        case 'print':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva"  id="tvaid" value="7.8" disabled="disabled">'), calcul_TTC();
            break;      
    }
})
};

function change_TTC(){
    $('#montant_ht').on('change', function(e){
        let montant_ttc = $(this).val()*parseFloat($('#tvaid').val())/100 + parseFloat($(this).val());     
        return $('#montant_ttc_id').html('<input type="number" class="form-control" name="montant_TTC" id="montantTtcId" value="'+montant_ttc.toFixed(2)+'" disabled="disabled">');
    })
}

function calcul_TTC(){
        let montant_ttc = $('#montant_ht').val()*parseFloat($('#tvaid').val())/100 + parseFloat($('#montant_ht').val());     
        return $('#montant_ttc_id').html('<input type="number" class="form-control" name="montant_TTC" id="montantTtcId" value="'+montant_ttc.toFixed(2)+'" disabled="disabled">');
};

function affiche_Tva(){
    let tva_val = $('#prestation option:selected').val();
    switch (tva_val) {
        case 'app':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva" id="tvaid" value="19.26" disabled="disabled">')
            break;       
        case 'web':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva"  id="tvaid" value="20" disabled="disabled">')
            break;
        case 'print':
            return $('#tva_id').html('<input type="number" class="form-control" name="tva"  id="tvaid" value="7.8" disabled="disabled">')
            break;      
    }   
    };

function createFacture(rue_value, codepostal_value, ville_value, siret_value){    
    let flow=`<div class="form-group"><label for="rue" id="labelclient">Rue</label><br><input type="text" name="rue" placeholder="rue" value="`;
    flow+=rue_value+`"></div>`;
    flow+=`<div class="form-group"><label for="code_postal" id="labelclient">Code postal</label><br><input type="number" min=0 id="postal" name="code_postal" placeholder="Code postal" value="${codepostal_value}"></div>`;
    flow+=`<div class="form-group"><label for="ville" id="labelclient">Ville</label><br><input type="text" name="ville" placeholder="Ville" value="${ville_value}"></div>`;
    flow+=`<div class="form-group"><label for="siret" id="labelclient">Siret</label><br><input type="text" name="siret" placeholder="Siret" value="${siret_value}"></div>`;
    return flow;
}

function createButton(_classbtn, textbtn){
    let flow = `<button type="button" class="${_classbtn}">${textbtn}</button>`;
    return flow;
}

let validateButton = createButton('btn btn-success', 'Valider');
let cancelButton = createButton('btn btn-danger', 'Annuler');
let closeButton = createButton('btn btn-danger', 'Fermer');
let addModalBtn = validateButton + cancelButton ;
let updateModalBtn = createButton('btn btn-info', 'Modifier') + cancelButton;

function texteModal(nameId, Id_id){
    switch (nameId) {
        case 'contact':
            return 'Voici les contacts de '+factures[Id_id-1].client.nom;
            break;
        case 'view':
            return 'Voici les factures de '+factures[Id_id-1].client.nom;
            break;
        case 'update':
            return 'Modifier les factures de '+factures[Id_id-1].client.nom;
            break;
        default :
            return 'Rien à signaler';
    }
}
    
function htmlContact(Id_id){
    let labelForm = '';
    let flow='<form>';
    let x = factures[Id_id-1].client.contacts;
    for (i in x){
        flow+=`<div class="form-group"><label for="input_${i}"><strong>${labelForm}</strong></label><input type="text" class="form-control" name="input_${i}" value="${x[i]}"></div></form>`
    }
    return flow;
}

function htmlContent(nameId, Id_id){
    switch (nameId) {
        case 'contact':{
            return htmlContact(Id_id);
            break;}
        case 'view':
            return `<div><strong>Client : </strong>`+factures[Id_id-1].client.nom+`</div>
                <div><strong>Libellé : </strong>`+factures[Id_id-1].libelle+`</div>
                <div><strong>Montant : </strong>`+factures[Id_id-1].montant+` €</div>`;
            break;
        case 'update':
            return '<p>pas de texte</p>';
            break;
        default :
            return 'Rien à signaler';
    }
}
    
function btnModal(nameId){
    switch (nameId) {
        case 'contact':
            return createButton('btn btn-info', 'Modifier') + closeButton;
            break;
        case 'view':
            return createButton('btn btn-info', 'Modifier') + cancelButton;
            break;
        case 'update':
            return validateButton + cancelButton;
            break;
        default :
            return 'Rien à signaler';
    }
}

function viewModal(Id_id, nameId){
    let envoyerModal = create_modal('Modal_'+nameId+'_'+Id_id, texteModal(nameId, Id_id), htmlContent(nameId, Id_id), btnModal(nameId));
    return envoyerModal;
}

function chooseI(){
    let tabI = [];
    $('i').each(function(){
        let Id_id = $(this).attr('id').split('_')[1];
        let Id_Name = $(this).attr('id').split('_')[0];
        $('#'+Id_Name+'_'+factures[Id_id-1].client.id).click(function(){
            console.log($(this).attr('id').split('_')[0] +' '+ $(this).attr('id').split('_')[1]);
            let x = (viewModal($(this).attr('id').split('_')[1], $(this).attr('id').split('_')[0]));
            return x;
        })

    }) 
}

function saveFacture(){

        var adresse = {
            rue: $('#formAddFacture input[name=rue]').val(),
            code_postal: $('#formAddFacture input[name=code_postal]').val(),
            ville: $('#formAddFacture input[name=ville]').val(),
        };
        
        var contacts = {
            nom_contact:'',
			mail_contact:'',
			tel:'',
			mobile:'',
        };
        
        var client = {
            id: String(factures.length+1),
            nom: $('#formAddFacture input[name=nom]').val(),
            adresse: adresse,
            siret: $('#formAddFacture input[name=siret]').val(),
            contacts: contacts,
        };
    
        var facture = {
           client: client,
           type_prestation:$('#formAddFacture select[name=prestation]').val(),
	       libelle:$('#formAddFacture input[name=libelle]').val(),
	       montant:$('#formAddFacture input[name=montantHT]').val(),
	       tva:$('#formAddFacture input[name=tva]').val(),
	       date_prestation:$('#formAddFacture input[name=date_prestation]').val(),
	       date_facture:$('#formAddFacture input[name=date_facture]').val(),
	       date_reglement:$('#formAddFacture input[name=date_reglement]').val(),
	       date_relance:'', 
        };

    factures[factures.length] = facture;

	localStorage.factures = JSON.stringify(factures);

	listeFactures();

	return $('#addFacture').modal('hide'), $('main').prepend(`<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Facture enregistrée !</strong> 
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`);

}

function saveButton(){
    $('.btn-success').click(function(){
        return saveFacture();
    });
}

function closeModalButton(){
    $('.btn-danger').click(function(e){
        console.log($(this).parent().parent().parent().parent().get());
        return $(this).parent().parent().parent().parent().modal('hide');
    });
}

function addModal(){
    let factureHtml = affiche_Client();
    create_modal('addFacture','Ajouter une facture',factureHtml, addModalBtn);
    let rue_value ='';
    let codepostal_value ='';
    let ville_value ='';
    let siret_value ='';
    let AdresseHtml = createFacture(rue_value, codepostal_value, ville_value,siret_value);
    return $('#clientAdresse').html(AdresseHtml); 
}

function main(){
	get_factures();
	listeFactures();
//    let factureHtml = affiche_Client();
//    let addModal = create_modal('addFacture','Ajouter une facture',factureHtml, addModalBtn);  
    $('#add').click(function(){addModal()});
    let deleteModal = create_modal('deleteFacture','Supprimer une facture',deleteFacturehtml, addModalBtn);  
    $('#delete').click(function(){console.log(deleteModal);});
    chooseI();
    affiche_ClientAdresse();
    affiche_Tva(); 
    change_Tva();
    calcul_TTC();
    change_TTC();
    saveButton();
    closeModalButton();
}

function create_modal(id,title,content_html,footer){

	var bdy = document.createElement('div');

	var modal = document.createElement('div');

	var dialog = document.createElement('div');

	var content = document.createElement('div');

	var header = document.createElement('div');

	var ftr = document.createElement('div');

	modal.className ='modal fade';

	modal.setAttribute('id',id);

	modal.setAttribute('role','dialog');

	dialog.className ='modal-dialog';

	modal.appendChild(dialog);

	content.className ='modal-content';

	dialog.appendChild(content);

	header.className ='modal-header';

	content.appendChild(header);

//	var b = create_button('button','&times;','','','close');
//
//	b.setAttribute('data-dismiss',id)
//
//	header.appendChild(b);

	var titl = document.createElement('h4');

	titl.innerHTML = title;

	titl.className ='modal-title';

	header.appendChild(titl);

	bdy.className ='modal-body';

	bdy.setAttribute('id',id+'-modal-body');

	if ((content_html) && (content_html != ''))bdy.innerHTML = content_html;

	content.appendChild(bdy);

	ftr.className ='modal-footer';

	ftr.innerHTML = footer;

	content.appendChild(ftr);

	$('body').append(modal);

	return modal;

}

function create_button(type,val,id,target,_class,modal,modal_target){ 

	var btn =document.createElement(type);

	if((id)&&(id != '')) btn.setAttribute('id',id);

	if((type)&&(type!='a')&&(type!='')) btn.setAttribute('type',type);

	if(modal){

		btn.setAttribute('data-toggle','modal');

		btn.setAttribute('data-target',modal_target);

	}

	if((_class)&&(_class!='')) btn.setAttribute('class',_class);

	btn.innerHTML=val;
    console.log('#'+target);
//	if ((target)&&(target!='')) document.querySelector('#'+target).appendChild(btn); 
    console.log(btn);
    if ((target)&&(target!='')) $(target).appendChild(btn); 
	return btn;
    

}

$(function(){main()});
