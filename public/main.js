$(function() {
    console.log( "ready!" );

    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    var data=[];
    var newCar={};
    var updateCar={};
    var flag=false;
    var urlString;

    $('.submit').on('click.submitButton',function($e){
            //return false;
            newCar.make=$('#exampleCarMake').val();
            newCar.bhp=$('#exampleBHP').val();

            alert(newCar.make);

            $.ajax({
                    method: 'POST', //optional. GET (default), POST, PUT, DELETE, etc.
                    context: document.body, //optional. Scopes the response to a part of your page
                    data: newCar, // <-- body of the request goes here
                    url: 'http://localhost:3000/cars/'
                    }).done(function(response){

                        data.push(newCar);
                        alert('update complete');


                }).fail(function(error){ //just to show you how to error catch
                        console.error(error);

                }).always(function(){ //this happens after EVERY ajax call

                  console.info("ajax delete call made");
                });


    });


    $('.delete').on('click',function($e){

        if ($(event.target).text()==='Update'){

            updateCar._id=data[$(event.target).closest('tr').index()]._id;
            updateCar.make=$(event.target).closest('form').find('.input1').val();
            updateCar.bhp=$(event.target).closest('form').find('.input2').val();
            urlString='http://localhost:3000/cars/'+updateCar._id

            $.ajax({
                    method: 'PUT', //optional. GET (default), POST, PUT, DELETE, etc.
                    context: document.body, //optional. Scopes the response to a part of your page
                    data: updateCar, // <-- body of the request goes here
                    url: urlString
                    }).done(function(response){
                        var flag=data.find(function(element){return element._id=updateCar._id})
                        data.splice(flag.id,1);
                        data.push(updateCar);
                        alert('update complete');


                }).fail(function(error){ //just to show you how to error catch
                        console.error(error);

                }).always(function(){ //this happens after EVERY ajax call

                  console.info("ajax delete call made");
                });

            //alert(updateCar._id +' '+updateCar.make+' '+updateCar.bhp);
        };

        if ($(event.target).text()==='Delete')
         {
            var r=$(event.target).closest('tr').index();
            var id=data[r]._id;
            urlString='http://localhost:3000/cars/'+id;
            var row=$(event.target).parent().parent();

            $.ajax({
                    method: 'DELETE', //optional. GET (default), POST, PUT, DELETE, etc.
                    context: document.body, //optional. Scopes the response to a part of your page
                    data: {}, // <-- body of the request goes here
                    url: urlString
                    }).done(function(response){

                        data.splice(r,1);
                        row.remove();


                }).fail(function(error){ //just to show you how to error catch
                        console.error(error);

                }).always(function(){ //this happens after EVERY ajax call

                  console.info("ajax delete call made");
                });
            }
})


    $('#getCars').on('click.getCarData',function($e){
        //$e.stopPropagation();

        console.log('get car button clicked');

        //

        $('#carDatabase tbody tr').remove()

        $.ajax({
                method: 'GET', //optional. GET (default), POST, PUT, DELETE, etc.
                context: document.body, //optional. Scopes the response to a part of your page
                data: {}, // <-- body of the request goes here
                url: 'http://localhost:3000/cars/'
            }).done(function(response){
                data=[];
                response.forEach(function(element,index){
                    element.id=index;

                    data.push(element);

                    console.log(element);

                    var html;

                    html=template(element);

                    $('#carDatabase tbody').append(html);

                    console.log(html);

                });
            }).fail(function(error){ //just to show you how to error catch
              console.error(error);
            }).always(function(){ //this happens after EVERY ajax call
              console.info("ajax call made");
            });

        ;



    })

    // data[0]={id:1,
    //          first:'toyota',
    //          last:'corolla',
    //          handle:300}
    //
    // data[1]={id:2,
    //         first:'vauxhall',
    //         last:'astra',
    //         handle:120}
    //
    // data[2]={id:3,
    //         first:'volvo',
    //         last:'estate',
    //         handle:120}
    //
    //
    // console.log(data);
    //


});
