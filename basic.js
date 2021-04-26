if (window.location.protocol == 'http:')  {
	window.location.href =  window.location.href.replace( 'http:', 'https:');	
}

$('#btn-confirma').on("click", function(){
	var curp=$('#curp').val();
        var gres=$('#g-recaptcha-response').val();
        var _curpform_token=$('#_curpform_token').val();
	$('#divcurp').hide();
	$('.bg-info').hide();
	$('#confirmacion').show();
	$('#consulta_curp').html("<img src='img/loading.gif' /> CONSULTANDO <img src='img/loading.gif' />");
//	$('#consulta_curp').load('bcurps.php',{'curp':curp,'_curpform_token':_curpform_token, 'g-recaptcha-response':gres});
});
$('#boton-aclara').on("click", function(){
        $('#boton-aclara').hide();
        $('#aclaracion').removeClass("d-none");
	//$('#aclaracion').show();
});
$('#btn-aclara').on("click", function(){
	var curp=$('#curp_aclara').val();
        var telefono=$('#telefono_aclara').val();
        var _aclaraform_token=$('#_aclaraform_token').val();
	if($('#telefono_aclara').val().length==10){
	     $(this).prop( "disabled", true );
             $(this).html('Enviando...');   
	     $('#consulta_curp').load('aclaracion.php',{'curp':curp,'_aclaraform_token':_aclaraform_token,'telefono':telefono});  
	}else{
	    alert("Escriba el teléfono con 10 dígitos");
	}
});
$('#cp,#telefono_1,#telefono_2,#telefono_aclara').on("keyup", function(){
    this.value = (this.value + '').replace(/[^0-9]/g, '');
});
/*
$('#curp').on('input', function() {
  if($(this).val().length==18)
  $('#btn-confirma').prop("disabled",false);
  else
  $('#btn-confirma').prop("disabled",true);
});*/

$('#desvac').on("click", function(){
        //$('#registro').show();
        $('#registro').removeClass("d-none");
	$('#entidadd').focus();
});

$('#confirmar').on("click", function(){
        $('#divcurp').hide();
});

$('#comprobante').on("click", function(){
$(this).hide();
});

$('#entidadd').on("change", function(){
	var entidad = $('#entidadd').val();
    	if (entidad>0&&entidad<33){
	   $.post("entidadd.php", { entidadd: entidad }, function(data) {
                    $("#municipio").html(data);
                });   
	}
});
function validarFormulario() {
        var error = false;
	var messages = '';
	var tel1=$('#telefono_1').val();
	var tel2=$('#telefono_2').val();
	var not=$('#nota').val();
	var cp_v=$('#cp').val();
        if(document.getElementById('telefono_1').value==''&&document.getElementById('telefono_2').value==''&&document.getElementById('correoe').value==''&&document.getElementById('correoea').value==''&&document.getElementById('nota').value==''){
                error = true;
                messages = 'Escriba al menos un dato de contacto';
        }
        if(document.getElementById('municipio').value=='' && document.getElementById('cp').value=='')
        {
                error = true;
                messages = 'Seleccione Municipio o CP';
        }

	if(tel1.length>0&&tel1.length<10){
                error = true;
                messages = 'Escriba el teléfono con 10 dígitos';
	}
        if(tel2.length>0&&tel2.length<10){
                error = true;
                messages = 'Escriba el teléfono con 10 dígitos';
        }

	if(nota.length>0&&nota.length<10){
                error = true;
                messages = 'Escriba la nota con al menos 10 carácteres';
	}
        if(document.getElementById('entidadd').value=='0')
        {
                error = true;
                messages = 'Seleccione la Entidad donde desea vacunarse';
        }
	if(cp_v.length>0&&cp_v.length<5){
                error = true;
                messages = 'Escriba el código postal con 5 números';
        }
        if (error==true) {
                alert(messages);
                return false;
        } else {
                $('#confirmar').hide();
		return true;
        }
}