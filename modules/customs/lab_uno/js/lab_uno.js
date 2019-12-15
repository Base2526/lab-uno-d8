/**
 * @file
 * Contains the definition of the behaviour jsTestBlackWeight.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  /**
   * Attaches the JS test behavior to to weight div.
   */
  // Drupal.behaviors.jsTestBlackWeight = {
  //   attach: function (context, settings) {
  //     var weight = drupalSettings.js_example.js_weights.black;
  //     var newDiv = $('<div></div>').css('color', 'black').html('I have a weight of ' + weight);
  //     $('#js-weights').append(newDiv);
  //   }
  // };

  // Set stepper color
  var documentStatus = $("input[name='document_status']").val();
  var userRole = $("input[name='user_role']").val();
  var editChoice = $("#edit-edit-options option:selected").val();
  var activeTab = 1;
  var isRecreate = ($("input[name='isrecreate']").val() == '1') ? true : false;
  console.log('click option', editChoice);

  $("#stepperCircle1, #stepperCircle2, #stepperCircle3, #stepperCircle4, #stepperCircle5").removeClass('highlightCircle');
  if(documentStatus == '17' || documentStatus == '23'){
    // New, Reopen to sale account
    $("#stepperCircle1").addClass('highlightCircle');
  }else if(documentStatus == '18' || documentStatus == '22'){
    // Inprogress, Reopen to B2B
     $("#stepperCircle1, #stepperCircle2").addClass('highlightCircle');
  }else if(documentStatus == '19'){
    // Pending approval
    $("#stepperCircle1, #stepperCircle2, #stepperCircle3").addClass('highlightCircle');
  }else if(documentStatus == '20'){
    // Approved
     $("#stepperCircle1, #stepperCircle2, #stepperCircle3, #stepperCircle4").addClass('highlightCircle');
  }else if(documentStatus == '21'){
    // Done
    $("#stepperCircle1, #stepperCircle2, #stepperCircle3, #stepperCircle4, #stepperCircle5").addClass('highlightCircle');
    // disable all input and submit button
      $('#myTabContent input').prop("disabled", true);
      $('#myTabContent select').prop("disabled", true);
      $('#myTabContent textarea').prop("disabled", true);
      setTimeout(function(){ 
        $('#myTabContent .improvedselect_control').hide();
        $('#myTabContent .improvedselect_sel').css("pointer-events","none");
        $('#myTabContent .improvedselect_all').css("pointer-events","none");
      }, 1500);
      $('#tab-attach-documents, #tab-construction-request, #tab-purchase-contract, #tab-requisition-contract, #tab-attach-contract').hide();
  }


  // disable field if is recreate document
  if(isRecreate){
    var editChoice = $('input[name="hidden_edit_options"]').val();

    $('#myTabContent input').prop("disabled", true);
    $('#myTabContent select').prop("disabled", true);
    $('#myTabContent textarea').prop("disabled", true);
    setTimeout(function(){ 
      $('#myTabContent .improvedselect_control').hide();
      $('#myTabContent .improvedselect_sel').css("pointer-events","none");
      $('#myTabContent .improvedselect_all').css("pointer-events","none");
    }, 1500);

    // for b2b approving
    // $('#edit-approve-status input').prop("disabled", false);
    // $('#edit-attachment-annotation').prop("disabled", false);
    

    if(editChoice == '86'){
    // 86 เครดิตเทอม
      $('#tab-attach-documents').show();
      $('#tab-requisition-contract, #tab-attach-contract').hide();
      $('#myTabContent select#edit-loan-request-period').prop("disabled", false);
      $('.hidden-section').hide();
    }else if(editChoice == '87'){
      // 87 วงเงิน
      $('#tab-attach-documents').show();
      $('#tab-requisition-contract, #tab-attach-contract').hide();
      $('.additionCreditLimit').show();
      $('#edit-addition-credit-limit').prop("disabled", false);
      $('.hidden-section').hide();
    }else if(editChoice == '88'){
      // 88 ที่อยู่ ต่อสัญญา เพิ่มสาขา
      $('#tab-attach-documents').hide();
      $('#tab-construction-request, #tab-purchase-contract, #tab-requisition-contract, #tab-attach-contract').show();

      $('#edit-company-address, .improvedselect_filter').prop("disabled", false);
      setTimeout(function(){ 
        $('#myTabContent .improvedselect_control').show();
        $('#myTabContent .improvedselect_sel').css("pointer-events","auto");
        $('#myTabContent .improvedselect_all').css("pointer-events","auto");
      }, 1500);

      $('#myTabContent #edit-attachment-contract-upload').prop("disabled", false);
    }    

    if(documentStatus == '19'){
      // Pending approval
      if(userRole == 'b2b'){
        $('#myTabContent select#edit-loan-request-period').prop("disabled", false);
        $('#edit-addition-credit-limit').prop("disabled", false);
        $('#edit-company-address, .improvedselect_filter').prop("disabled", false);
        setTimeout(function(){ 
          $('#myTabContent .improvedselect_control').show();
          $('#myTabContent .improvedselect_sel').css("pointer-events","auto");
          $('#myTabContent .improvedselect_all').css("pointer-events","auto");
        }, 1500);
        $('#myTabContent #edit-attachment-contract-upload').prop("disabled", false);
      }else if(userRole == 'bjc'){
        $('.analyzeResultForm input').prop("disabled", false);
        $('.analyzeResultForm select').prop("disabled", false);
        $('.analyzeResultForm textarea').prop("disabled", false);
        
        // for bjc approving
        $('#edit-analyze-result input').prop("disabled", false);
        $('#edit-analyze-result-comment').prop("disabled", false);
      }  
    }else if(documentStatus == '22'){
      // Reopen to B2B
      if(userRole == 'b2b'){
        
      }else if(userRole == 'bjc'){
        $('#myTabContent select#edit-loan-request-period').prop("disabled", false);
        $('#edit-addition-credit-limit').prop("disabled", false);
        $('#edit-company-address, .improvedselect_filter').prop("disabled", false);
        setTimeout(function(){ 
          $('#myTabContent .improvedselect_control').show();
          $('#myTabContent .improvedselect_sel').css("pointer-events","auto");
          $('#myTabContent .improvedselect_all').css("pointer-events","auto");
        }, 1500);
        $('#myTabContent #edit-attachment-contract-upload').prop("disabled", false);
      }  
    }
    
  }

  $(".horizontal-tab-button-0").on("click", function() {
    alert('0');
  });

  // $(".horizontal-tab-button-1").on("click", function() {
  //   alert('1');
  // });

  // event when click tab
  $("#customer_data-tab").on("click", function() {
    console.log(">>> tab1");
    $("input[name='tabs_active']").val('1');
    activeTab = 1;
    hideShowSubmitButton(documentStatus, userRole, activeTab);
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();

  });

  $("#attachment_documents-tab").on("click", function() {
    console.log(">>> tab2");
    $("input[name='tabs_active']").val('2');
    activeTab = 2;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  $("#customer_view-tab").on("click", function() {
    console.log(">>> tab3");
    $("input[name='tabs_active']").val('3');
    activeTab = 3;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  $("#construction_request-tab").on("click", function() {
    console.log(">>> tab4");
    $("input[name='tabs_active']").val('4');
    activeTab = 4;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').show();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  $("#purchase_contract-tab").on("click", function() {
    console.log("tab5");
    $("input[name='tabs_active']").val('5');
    activeTab = 5;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').show();
    $('#pdf_tab7').hide();
  });

  $("#analyze_result-tab").on("click", function() {
    console.log("tab6");
    $("input[name='tabs_active']").val('6');
    activeTab = 6;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  $("#requisition_contract-tab").on("click", function() {
    console.log("tab7");
    $("input[name='tabs_active']").val('7');
    activeTab = 7;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').show();
  });

  $("#attachment_contract-tab").on("click", function() {
    console.log("tab8");
    $("input[name='tabs_active']").val('8');
    activeTab = 8;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  $("#annotation-tab").on("click", function() {
    console.log("tab9");
    $("input[name='tabs_active']").val('9');
    activeTab = 9;
    hideShowSubmitButton(documentStatus, userRole, activeTab)
    $('#pdf_tab4').hide();
    $('#pdf_tab5').hide();
    $('#pdf_tab7').hide();
  });

  function hideShowSubmitButton(documentStatus, userRole, activeTab){
    var editChoice = $('#edit-edit-options').val();
    if(documentStatus == '21'){ // Done
      if(userRole == 'b2b'){
        if(editChoice == '85'){
          $('#edit-save-without-validate-form').hide();
          $('#edit-send').hide();
        }else if(editChoice == '86' || editChoice == '87') {
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
        }else if(editChoice == '88') {
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
        }
      }else{
        $('#edit-save-without-validate-form').hide();
        $('#edit-send').hide();
      }
    }else if(documentStatus == '19'){ // Pending approval
      if(userRole == 'b2b'){
        $('#edit-save-without-validate-form').hide();
        $('#edit-send').hide();
      }else if(userRole == 'bjc'){
        $('#edit-save-without-validate-form').show();
        $('#edit-send').show();
      }
    }else if(documentStatus == '22'){ // Reopen to B2B
      if(userRole == 'b2b'){
        $('#edit-save-without-validate-form').show();
        $('#edit-send').show();
      }else if(userRole == 'bjc'){
        $('#edit-save-without-validate-form').hide();
        $('#edit-send').hide();
      }
    }else{
      switch(activeTab) {
        case 1:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
          break;
        case 2:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
          break;
        case 3:
          $('#edit-save-without-validate-form').hide();
          $('#edit-send').hide();
          break;
        case 4:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').hide();
          break;
        case 5:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').hide();
          break;
        case 6:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
          break;
        case 7:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').hide();
          break;
        case 8:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
          break;
        case 9:
          $('#edit-save-without-validate-form').show();
          $('#edit-send').show();
          break;
        default:
          $('#edit-save-without-validate-form').hide();
          $('#edit-send').hide();
      }
    }
  }

  // fade out message
  // setTimeout(function(){$('.messages__wrapper .alert-success').fadeOut();}, 3000);
  //   $(window).click(function(){$('.messages__wrapper .alert-success').fadeOut(1000);
  // });

  // disabled form in edit case, status Done
  $('#edit-edit-options').on("change", function(){
    // disable first default option
    $('#edit-edit-options option[value="85"]').css('display', 'none');
    var editChoice = $(this).val();
    hideShowSubmitButton(documentStatus, userRole, activeTab);

    $('#customer_data-tab').click();
    $('#myTabContent input').prop("disabled", true);
    $('#myTabContent select').prop("disabled", true);
    $('#myTabContent textarea').prop("disabled", true);
    $('#myTabContent .improvedselect_control').hide();
    $('#myTabContent .improvedselect_sel').css("pointer-events","none");
    $('#myTabContent .improvedselect_all').css("pointer-events","none");
    $('.additionCreditLimit').hide();

    if(editChoice == '86'){
    // 86 เครดิตเทอม
      $('#tab-attach-documents').show();
      $('#tab-construction-request, #tab-purchase-contract, #tab-analyze-result, #tab-requisition-contract, #tab-attach-contract').hide();
      $('#myTabContent select#edit-loan-request-period').prop("disabled", false);
      $('.hidden-section').hide();
    }else if(editChoice == '87'){
      // 87 วงเงิน
      $('#tab-attach-documents').show();
      $('#tab-construction-request, #tab-purchase-contract, #tab-analyze-result, #tab-requisition-contract, #tab-attach-contract').hide();
      $('.additionCreditLimit').show();
      $('#edit-addition-credit-limit').prop("disabled", false);
      $('.hidden-section').hide();
    }else if(editChoice == '88'){
      // 88 ที่อยู่ ต่อสัญญา เพิ่มสาขา
      $('#tab-attach-documents').hide();
      $('#tab-construction-request, #tab-purchase-contract, #tab-analyze-result, #tab-requisition-contract, #tab-attach-contract').show();
      $('#edit-company-address, .improvedselect_filter').prop("disabled", false);
      $('#myTabContent .improvedselect_control').show();
      $('#myTabContent .improvedselect_sel').css("pointer-events","auto");
      $('#myTabContent .improvedselect_all').css("pointer-events","auto");
      $('#myTabContent #edit-attachment-contract-upload').prop("disabled", false);
    }
  });

  $('#edit-cfd1').on("change paste keyup", function(){
    $('#cfd1-view').html($(this).val());
  });

  $('#edit-cfd2').on("change paste keyup", function(){
    $('#cfd2-view').html($(this).val());
  });

  $('#edit-bjc-comment1, #edit-bjc-comment11, #edit-bjc-comment12, #edit-bjc-comment2, #edit-bjc-comment21, #edit-bjc-comment22, #edit-bjc-comment3, #edit-bjc-comment4, #edit-bjc-comment5').on("change paste keyup", function(){
    var fid = this.id.replace('edit-', '');
    $('#' + fid + '-view').html($(this).val());
  });
  
})(jQuery, Drupal, drupalSettings);

//# sourceURL=b2b.js
