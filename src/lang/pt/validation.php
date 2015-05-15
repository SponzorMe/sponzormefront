<?php

return array(

/*
|--------------------------------------------------------------------------
| Validation Language Lines
|--------------------------------------------------------------------------
|
| The following language lines contain the default error messages used
| by the validator class. Some of the rules contain multiple versions,
| such as the size (max, min, between) rules. These versions are used
| for different input types such as strings and files.
|
| These language lines may be easily changed to provide custom error
| messages in your application. Error messages for custom validation
| rules may also be added to this file.
|
*/

"accepted"       => "O campo :attribute deve ser aceito.",
"active_url"     => "O campo :attribute não é uma URL válida.",
"after"          => "O campo :attribute deve ser uma data depois :date.",
"alpha"          => "O campo :attribute você só pode conter letras.",
"alpha_dash"     => "O campo :attribute você só pode conter letras, números e hífens.",
"alpha_num"      => "O campo :attribute você só pode conter letras e números.",
"array"          => "O campo :attribute deve ser uma matriz.",
"before"         => "O campo :attribute deve ser uma data anterior :date.",
"between"        => array(
		"numeric" => "O campo :attribute deve situar-se entre :min - :max.",
		"file"    => "O campo :attribute deve situar-se entre :min - :max kilobytes.",
		"string"  => "O campo :attribute deve situar-se entre :min - :max caracteres.",
		"array"   => "O campo :attribute deve situar-se entre :min y :max elementos.",
),
"confirmed"      => "O campo :attribute confirmação não corresponde.",
"date"           => "O campo :attribute não é uma data válida.",
"date_format" 	 => "O campo :attribute não coincide com o formato :format.",
"different"      => "O campo :attribute e :other deve ser diferente.",
"digits"         => "O campo :attribute deve ser :digits dígitos.",
"digits_between" => "O campo :attribute deve situar-se entre :min y :max dígitos.",
"email"          => "Eo formato do :attribute é inválido.",
"exists"         => "O campo :attribute selecionado inválido.",
"image"          => "O campo :attribute deve ser uma imagem.",
"in"             => "O campo :attribute selecionado inválido.",
"integer"        => "O campo :attribute deve ser um número inteiro.",
"ip"             => "O campo :attribute deve ser um endereço IP válido.",
"match"          => "Eo formato do :attribute é inválido.",
"max"            => array(
		"numeric" => "O campo :attribute deve ser inferior :max.",
		"file"    => "O campo :attribute deve ser inferior :max kilobytes.",
		"string"  => "O campo :attribute deve ser inferior :max caracteres.",
		"array"   => "O campo :attribute deve ter pelo menos :min elementos.",
	),

"mimes"         => "O campo :attribute deve ser um tipo de arquivo :values.",
"min"           => array(
		"numeric" => "O campo :attribute deve ter pelo menos :min.",
		"file"    => "O campo :attribute deve ter pelo menos :min kilobytes.",
		"string"  => "O campo :attribute deve ter pelo menos :min caracteres.",
),
"not_in"                => "O campo :attribute selecionado é inválido.",
"numeric"               => "O campo :attribute deve ser um número.",
"regex"                 => "O formato do campo :attribute é inválido.",
"required"              => "O campo :attribute necessário",
"required_if"           => "O campo :attribute é necessária quando o campo :other isto é :value.",
"required_with"         => "O campo :attribute é necessária quando :values presente.",
"required_with_all"     => "O campo :attribute é necessária quando :values presente.",
"required_without"      => "O campo :attribute é necessária quando :values não está presente.",
"required_without_all"  => "O campo :attribute é necessária quando há :values presente.",
"same"                  => "O campo :attribute é :other deve corresponder.",
"size"                  => array(
			"numeric" => "O campo :attribute deve ser :size.",
			"file"    => "O campo :attribute deve terner :size kilobytes.",
			"string"  => "O campo :attribute deve terner :size caracteres.",
			"array"   => "O campo :attribute deve conter :size elementos.",
),

"unique" => "O campo :attribute já foi tomada.",
"url"    => "Eo formato do :attribute é inválido.",

/*
|--------------------------------------------------------------------------
| Custom Validation Language Lines
|--------------------------------------------------------------------------
|
| Here you may specify custom validation messages for attributes using the
| convention "attribute_rule" to name the lines. This helps keep your
| custom validation clean and tidy.
|
| So, say you want to use a custom validation message when validating that
| the "email" attribute is unique. Just add "email_unique" to this array
| with your custom message. The Validator will handle the rest!
|
*/

'custom' => array(
	'attribute-name' => array(
	    'rule-name'  => 'custom-message',
	),
),

/*
|--------------------------------------------------------------------------
| Validation Attributes
|--------------------------------------------------------------------------
|
| The following language lines are used to swap attribute place-holders
| with something more reader friendly such as "E-Mail Address" instead
| of "email". Your users will thank you.
|
| The Validator class will automatically search this array of lines it
| is attempting to replace the :attribute place-holder in messages.
| It's pretty slick. We think you'll like it.
|
*/

'attributes' => array(
    'username' => 'usuario',
    'password' => 'contraseña'
),
);