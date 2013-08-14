function insertText( txt, pos )
{
	textchanged()
	
	// pos = optional parameter defining where in inserted text to put the caret
	// if undefined put at end of inserted text
	// if pos=1000 then using style options and move to just before final }
	// startPos = final position of caret in complete text
	if (pos==1000) {pos=txt.length-1};
	if (pos==undefined) { txt+=' '; pos=txt.length;}; // always insert a space after
	
	// my textarea is called latex_formula
	myField = document.getElementById('AnswerBox');
	if (document.selection) 	{
		// IE
		myField.focus();
		var sel = document.selection.createRange();
		// find current caret position
			
		var i = myField.value.length+1; 
		theCaret = sel.duplicate(); 
		while (theCaret.parentElement()==myField 
		&& theCaret.move("character",1)==1) --i; 
	
		// take account of line feeds
		var startPos = i - myField.value.split('\n').length + 1 ; 
	
		if ((txt.substring(1,5) == "left" || txt.substring(pos-1,pos)=='{') && sel.text.length)	{ 
			// allow highlighted text to be bracketed
			if(txt.substring(1,5) == "left")
			  ins_point=7;
			else
			  ins_point=pos;
				
			pos = txt.length + sel.text.length + 1;
			sel.text = txt.substring(0,ins_point) + sel.text + txt.substr(ins_point);	     
		} else {
			sel.text = txt;
		}
		// put caret in correct position to start editing
		var range = myField.createTextRange();
		range.collapse(true);
		range.moveEnd('character', startPos + pos);
		range.moveStart('character', startPos + pos);
		range.select();
	}
	else
	{
		// MOZILLA
		if (myField.selectionStart || myField.selectionStart == '0')	{
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			var cursorPos = startPos + txt.length;
			if ((txt.substring(1,5) == "left" || txt.substr(pos-1,1)=='{') && endPos > startPos)	{ 
				// allow highlighted text to be bracketed
				
				if(txt.substring(1,5) == "left")
				  ins_point=7;
				else
				  ins_point=pos;
				
				pos = txt.length + endPos - startPos + 1;
				txt = txt.substring(0,ins_point) + myField.value.substring(startPos, endPos) + txt.substr(ins_point);			
			}
			myField.value = myField.value.substring(0, startPos) + txt 
							+ myField.value.substring(endPos, myField.value.length);
		
			myField.selectionStart = cursorPos;
			myField.selectionEnd = cursorPos;
					
						// put caret in correct position to start editing
			myField.focus();
			myField.setSelectionRange(startPos + pos,startPos + pos);	
		}
		else	
			myField.value += txt;
	}
	myField.focus();
}