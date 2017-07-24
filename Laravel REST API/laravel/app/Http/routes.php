<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Allow: POST, GET, PUT, OPTIONS, DELETE, OPTIONS');

/*-------------------------------------------------------------------------
| Get API feed
|------------------------------------------------------------------------*/
Route::get('api/{table}', function($table) {
  $appRows = DB::select("SELECT * from {$table} ORDER BY orderby");
  return \Response::json($appRows);
});

/*-------------------------------------------------------------------------
| Update Row Text
|------------------------------------------------------------------------*/
Route::post('api/{table}/update/{id}/{text}', function($table, $id, $text) {
  // update text column
  //DB::update("UPDATE {$table} SET text = {$text} WHERE id = {$id}");
  DB::update("UPDATE {$table} SET text = '{$text}' WHERE id = {$id}");
  //UPDATE app_sorting SET text = 'ffafafsa' WHERE id = 1

  // return table ID data
  $appRows = DB::select("SELECT * from {$table} WHERE id = {$id}");
  return \Response::json($appRows);
});

/*-------------------------------------------------------------------------
| INSERT Row
|------------------------------------------------------------------------*/
Route::post('api/{table}/post/{text}', function($table, $text) {
  // insert item
  $id = DB::table($table)->insertGetId(array('text' => $text));

  // update orderby column
  DB::update("UPDATE {$table} SET orderby = {$id} WHERE id = {$id}");

  // return table ID data
  $appRows = DB::select("SELECT * from {$table} WHERE id = {$id}");
  return \Response::json($appRows);
});

/*-------------------------------------------------------------------------
| DELETE Row
|------------------------------------------------------------------------*/
Route::delete('api/{table}/delete/{id}', function($table, $id) {
  // delete item
  DB::delete("DELETE from {$table} where id = ?", array($id));

  // get updated DB response
  $appRows = DB::select("SELECT * from {$table}");
  return \Response::json($appRows);
});

/*-------------------------------------------------------------------------
| UPDATE Row Order
|------------------------------------------------------------------------*/
Route::post('api/{table}/sort/{id}/{direction}', function($table, $id, $direction) {
// SELECT * FROM app_sorting  WHERE id > '1' ORDER BY id LIMIT 1
  $carrot = ($direction == 'up' ? '>' : '<');
  $direction = ($direction == 'up' ? 'ASC' : 'DESC');

  $currentRow     = DB::select("SELECT id, orderby FROM {$table} WHERE id = {$id}");
  $rowToBeChanged = DB::select("SELECT id, orderby FROM {$table} WHERE orderby {$carrot} {$currentRow[0]->orderby} ORDER BY orderby {$direction} LIMIT 1");

  // swap DB values
  if ( $currentRow && $rowToBeChanged ) {
    DB::update("UPDATE {$table} SET orderby = {$rowToBeChanged[0]->orderby} WHERE id = {$id}");
    DB::update("UPDATE {$table} SET orderby = {$currentRow[0]->orderby} WHERE id = {$rowToBeChanged[0]->id}");
  }

  // get updated DB response
  $appRows = DB::select("SELECT * from {$table} ORDER BY orderby");
  return \Response::json($appRows);
});
