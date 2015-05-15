@extends('layouts.default-angular')

{{-- Web site Title --}}
@section('title')
@parent
{{trans('pages.helloworld')}}
@stop

{{-- Content --}}
@section('content')
<div class="API">
	<h1>Sponzorme API</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1</td></tr>
			<tr><th>Comments: </th><td>You are here!</td></tr>
		</table>
	</pre>
	<h1>Explicit Login</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/authentication</td></tr>
			<tr><th colspan="2"><h1>Post Parameters </h1></th></tr>
			<tr><th>email: </th><td>example@example.com</td></tr>
			<tr><th>password: </th><td>Your password</td></tr>
			<tr><th colspan="2"><h1>Response</h1> </th></tr>
			<tr><th>success: </th><td>boolean (true) (false)</td></tr>
			<tr><th>status: </th><td>Text (Authenticated/Not Authenticated)</td></tr>
			<tr><th>message: </th><td>If the status is "Not Authenticated" you will receive the error description, If the status is "Authenticated" you won't see this.</td></tr>
			<tr><th>key: </th><td>if the status is "Authenticated" you will receive MD5 key that you will use to make every request</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>email: </th><td>example@example.com</td></tr>
			<tr><th>password: </th><td>Your password</td></tr>
			<tr><th>Response Fails: </th><td><pre>{
success: true
status: "Not Authenticated"
message: "Cannot login user [seagomezar@gmail.com] as they are not activated."
}</pre></td></tr>
<tr><th>Response Success: </th><td><pre>{
success: true
status: "Authenticated"
key: "495067fd67fc5a7bededd4da78c43a03"
}</pre></td></tr>
		</table>
	</pre>
		<h1>Check key</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/check/{key}</td></tr>
			<tr><th>Comments: </th><td>Works in order to verify if the MD5 login key is valid.</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>key: </th><td>MD5 Key</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response: </th><td><pre>
				{"success":true,"status":"Authenticated"} / {"success":true,"status":"Not Authenticated"}
			</pre></td></tr>
			
		</table>
	</pre>
	<h1>Get User</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/user/{key}</td></tr>
			<tr><th>Comments: </th><td>Get a user</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>key: </th><td>MD5 Key</td></tr>
			<tr><th colspan="2"><h1>Post Parameters </h1></th></tr>
			<tr><th>userId: </th><td>Int id User</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response: </th><td><pre>
				{
					success: true
					status: "Authenticated"
					User: [1]
					0:  {
					id: 2
					email: "user@user.com"
					password: "$2y$10$DbFpCXLQfS6Va1OXqfZ9Hux2V2fgYhbl8mjiiHV5hfE3IGhfSJ2/a"
					permissions: null
					activated: 1
					activation_code: null
					activated_at: null
					last_login: "2014-08-30 21:08:30"
					persist_code: "$2y$10$4BEUyauaLBEmlRhqXAS5b.UBRm2QiMdvS31CPDDmjHJEGvsp4na4m"
					reset_password_code: null
					first_name: null
					last_name: null
					company: ""
					created_at: "2014-08-20 00:11:45"
					updated_at: "2014-08-30 21:08:30"
					name: "Usuario Sisas"
					country: "Colombia"
					state: "Choco"
					city: "Quibdo"
					sex: 1
					age: 100
					custom_status: 0
					login_code: "3cdeb9e0a1cbd6368f914df078bfa2bc"
					login_valid_until: "2014-08-31 21:08:30"
					}
				}
			</pre></td></tr>
			
		</table>
	</pre>
	<h1>Get all Users</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/users/{key}</td></tr>
			<tr><th>Comments: </th><td>Get all users.</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>key: </th><td>MD5 Key</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response: </th><td><pre>
				A list of user like format in the last response
			</pre></td></tr>
			
		</table>
	</pre>
	<h1>Create User</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/create/user</td></tr>
			<tr><th>Comments: </th><td>create a user</td></tr>
			<tr><th colspan="2"><h1>Post Parameters </h1></th></tr>
			<tr><th>email: </th><td>example@email.com</td></tr>
			<tr><th>password: </th><td>your password</td></tr>
			<tr><th>password_confirmation: </th><td>your password</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response Success: </th><td><pre>
				{
success: true
error: false
message: {
success: true
message: "Your account has been created. Check your email for the confirmation link."
mailData: {
activationCode: "tYE3gc9U0YSWxE3mpZlx1u1vilDMtTvR0ExvpQi6JV"
userId: 35
email: "test@test.com"
}-
}-
}
			</pre></td></tr>
		</table>
	</pre>
	<h1>Edit User</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/edit/user/{key}</td></tr>
			<tr><th>Comments: </th><td>create a user</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>key: </th><td>MD5 Key</td></tr>
			<tr><th colspan="2"><h1>Post Parameters </h1></th></tr>
			<tr><th>userId:* </th><td>Int id User</td></tr>
			<tr><th>name: </th><td>your name</td></tr>
			<tr><th>email: </th><td>example@email.com</td></tr>
			<tr><th>city: </th><td>City name</td></tr>
			<tr><th>state: </th><td>State Name</td></tr>
			<tr><th>country: </th><td>Country name</td></tr>
			<tr><th>sex: </th><td>0 female/ 1 male</td></tr>
			<tr><th>age: </th><td>18 to 150</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response Success: </th><td><pre>
				{
success: true
error: false
message: "User Updated Succesfuly"
data: {
incrementing: true
timestamps: true
exists: true
}-
}
			</pre></td></tr>
			<tr><th>Comments: </th><td>Just the userId and one field is required.</td></tr>
		</table>
	</pre>
	<h1>Remove User</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/remove/user/{key}</td></tr>
			<tr><th>Comments: </th><td>Get a user</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>key: </th><td>MD5 Key</td></tr>
			<tr><th colspan="2"><h1>Post Parameters </h1></th></tr>
			<tr><th>userId: </th><td>Int id User</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response Fails: </th><td><pre>
				{
success: true
status: "Authenticated"
error: true
message: "User Not Found"
}
			</pre></td></tr>
			<tr><th>Response Success: </th><td><pre>
				{
success: true
status: "Authenticated"
error: false
message: "User Removed"
}
			</pre></td></tr>
			<tr><th>Comments: </th><td>To remove a user you should ensure the foreing keys are empty.</td></tr>
		</table>
	</pre>
	<h1>Get Categories</h1>
	<pre>
		<table class="table" style="background: gray">
			<tr><th>Url: </th><td>api/v1/categories/{lang}</td></tr>
			<tr><th>Comments: </th><td>Get the categories</td></tr>
			<tr><th colspan="2"><h1>Get Parameters </h1></th></tr>
			<tr><th>lang: </th><td>en, es or pt</td></tr>
			<tr><th colspan="2"><h1>Example </h1></th></tr>
			<tr><th>Response Success: </th><td><pre>
				[14]
0:  {
id: 1
title: "Outdoor"
body: "All About the Bussines!"
created_at: "2014-08-20 05:11:45"
updated_at: "2014-08-20 05:11:45"
lang: "en"
}-
1:  {
id: 2
title: "Art & Culture"
body: "All About the Bussines!"
created_at: "2014-08-20 05:11:45"
updated_at: "2014-08-20 05:11:45"
lang: "en"
}-
2:  {
id: 3
title: "Dancing"
body: "All About the Bussines!"
created_at: "2014-08-20 05:11:45"
updated_at: "2014-08-20 05:11:45"
lang: "en"
}-
3:  {
id: 4
title: "Wellness"
body: "All About the Bussines!"
created_at: "2014-08-20 05:11:45"
updated_at: "2014-08-20 05:11:45"
lang: "en"
}-
4:  {
id: 5
title: "Career & Business"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
5:  {
id: 6
title: "Eat & Foods"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
6:  {
id: 7
title: "Belief"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
7:  {
id: 8
title: "Sports & Fitness"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
8:  {
id: 9
title: "Education"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
9:  {
id: 10
title: "Photography"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
10:  {
id: 11
title: "Languages"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
11:  {
id: 12
title: "Books"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
12:  {
id: 13
title: "Music"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}-
13:  {
id: 14
title: "Technology"
body: "All About the Bussines!"
created_at: "-0001-11-30 00:00:00"
updated_at: "-0001-11-30 00:00:00"
lang: "en"
}
			</pre></td></tr>
			<tr><th>Comments: </th><td>To remove a user you should ensure the foreing keys are empty.</td></tr>
		</table>
	</pre>
</div>
@stop