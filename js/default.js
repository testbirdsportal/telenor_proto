$(function(){
	futamido();
	kivalasztas();
	kivalasztott_modositas();
});

//futamidő változtatás
function futamido(){
	$('select[name="futamido"]').change(function(){
		var honap = $(this).val();
		var ar = $(this).find('option:selected').data('reszlet');
		$(this).closest('td.tr').find('.torlesztoreszlet').html(ar);
		$('select[name="futamido"]').each(function(){
			var max_ertek = $(this).find('option:last').val();
			if(parseInt(honap) <= parseInt(max_ertek)){
			    $(this).val(honap);
			    var ar = $(this).find('option:selected').data('reszlet');
			    $(this).closest('td.tr').find('.torlesztoreszlet').html(ar);
			}
		})
	});
}

//ha módosítjuk a felsőt, akkor minden más is módosuljon
function kivalasztott_modositas(){
	$('select.kivalasztott').change(function(){
		console.log('hajrá');
		var value = $(this).val();
		$('select[name="futamido"]').each(function(){
			var max_ertek = $(this).find('option:last').val();
			if(parseInt(value) <= parseInt(max_ertek)){
			    $(this).val(value);
			    var ar = $(this).find('option:selected').data('reszlet');
			    $(this).closest('td.tr').find('.torlesztoreszlet').html(ar);
			}
		})
	})
}

function kivalasztas(){
	//ha az online árat választja
	$('button[name="kivalaszt_online"]').click(function(){
		$('input[name="optradio"][value="reszletre"]').prop('checked','false');
		$('input[name="optradio"][value="egyosszeg"]').prop('checked','true');
		$('.sum').addClass('active');
		$('.reszlet').removeClass('active');
	
		/**** ONLINE ÁR ****/
		var ar = $(this).closest('.sectr').find('td.sec.online.right').html();
		$('.sum p.n7').html(ar);
		var eredeti_ar = $(this).closest('td.tr').find('tr.sectr:first-child td.sec.right').html();
		eredeti_ar = parseInt(eredeti_ar);
		ar = parseInt(ar);
		var kulonbseg = eredeti_ar - ar;
		kulonbseg += '000 Ft';
		console.log(kulonbseg == '0 000 Ft' || kulonbseg == '0000 Ft');
		if(kulonbseg == '0 000 Ft' || kulonbseg == '0000 Ft'){
			$('.discount').hide();
		}else{
			$('.discount p.n7').html(kulonbseg);
			$('.discount').show();
		}
		/**** ONLINE ÁR ****/
		
		/*** HAVI ***/
		$('select.kivalasztott option').remove();
		//kiolvassuk a select-et
		var db = $(this).closest('td.tr').find('select[name="futamido"] option').length;
		if(db >0){
			//$('div.discount').show();
			$('div.reszlet').show();
			$(this).closest('td.tr').find('select[name="futamido"] option').each(function(){
				var honap = $(this).val();
				var ar = $(this).data('reszlet');
				$('select.kivalasztott').append('<option data-reszlet = "'+ar+'" value="'+honap+'"><span class="honap">'+honap+' hó</span> <span class="havi_reszlet">'+ar+' Ft</span></option>');
				
			});
			$('select.kivalasztott').val(22);
		}else{
			//$('div.discount').hide();
			$('div.reszlet').hide();
		}
		/*** HAVI ***/
		finish($(this));
		
	});
	//ha a havi részletet választja
	$('button[name="kivalaszt_havi"]').click(function(){
		$('input[name="optradio"][value="egyosszeg"]').prop('checked','false');
		$('input[name="optradio"][value="reszletre"]').prop('checked','true');
		$('.reszlet').addClass('active');
		$('.sum').removeClass('active');
		
		/**** HAVI ****/
		$('select.kivalasztott option').remove();
		//kiolvassuk a select-et
		$('div.discount').show();
		$('div.reszlet').show();
		$(this).closest('td.tr').find('select[name="futamido"] option').each(function(){
			var honap = $(this).val();
			var ar = $(this).data('reszlet');
			$('select.kivalasztott').append('<option data-reszlet = "'+ar+'" value="'+honap+'"><span class="honap">'+honap+' hó</span> <span class="havi_reszlet">'+ar+' Ft</span></option>');
			
		});
		var kivalasztott = $(this).closest('td.tr').find('select[name="futamido"]').val();
		$('select.kivalasztott').val(kivalasztott);
		var kezdoreszlet = $(this).closest('td.tr').find('tr.sectr_').find('td.sec.right').html();
		console.log(kezdoreszlet);
		$('p.n7.kezdoreszlet').html(kezdoreszlet);
		/**** HAVI ****/
		
		/**** ONLINE ÁR ****/
		var ar = $(this).closest('td.tr').find('td.sec.online.right').html();
		$('.sum p.n7').html(ar);
		var eredeti_ar = $(this).closest('td.tr').find('tr.sectr:first-child td.sec.right').html();
		eredeti_ar = parseInt(eredeti_ar);
		ar = parseInt(ar);
		var kulonbseg = eredeti_ar - ar;
		kulonbseg += '000 Ft';
		if(kulonbseg == '0 000 Ft' || kulonbseg == '0000 Ft'){
			$('.discount').hide();
		}else{
			$('.discount p.n7').html(kulonbseg);
			$('.discount').show();
		}
		/**** ONLINE ÁR ****/
		
		finish($(this));
	});
}

function active_tab(){
	$('li.prices_tab a').trigger('click');
}

function finish(cel){
	//kiválasztott díjcsomagot felül módosítjuk
	var tarifacsomag = cel.closest('tr.tr').find('td.td:first-child').html();
	var havidij = cel.closest('tr.tr').find('td.td:nth-child(2)').html();		
	var leiras = cel.closest('tr.tr').find('td.td:nth-child(3)').html();
	
	$('.tarif p.n4.havidij').html(havidij);
	$('.tarif p.n2.tarifacsomag').html(tarifacsomag);
	$('.tarif p.n5.leiras').html(leiras);
	$('.tarif p.n3').hide();
	
	$('html,body').animate({scrollTop:0}, '500', 'swing', function() { });
	active_tab();
}