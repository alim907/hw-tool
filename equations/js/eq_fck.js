// --- FCKEditor Integration ----
var oEditor = window.opener;
var FCKEquation=null;
var eSelected=null;

// Loads the equations from the fckeditor, or create a default equations for an example
function LoadSelected()
{
  // Look for fckeditor
	if(oEditor && typeof(oEditor.FCKEquation)!='undefined')
	{
    FCKEquation = oEditor.FCKEquation;
		if(FCKEquation) 
			eSelected = oEditor.FCKSelection.GetSelectedElement();
	
		if ( eSelected && eSelected.tagName == 'IMG' && eSelected._fckequation )	{
			var comm = unescape( eSelected._fckequation );
			var parts = comm.match( /\\f([\[\$])(.*?)\\f[\]\$]/ );
			
			document.getElementById('latex_formula').value = parts[2];
	
			if(parts[1]=='[')
				document.getElementById('eqstyle2').checked=true;
			else
				document.getElementById('eqstyle1').checked=true;	
			renderEqn(null);	
		}
		else	{
			// Put any default equations in the line below...
			document.getElementById('latex_formula').value = '';
			eSelected == null ;
		}	
	}
}